import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateAge } from "@/lib/age";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/courbe-info?patientId=123
// Returns all growth records for a given patient sorted chronologically
// =========================================================================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { error: "Le paramètre patientId est requis" },
        { status: 400 },
      );
    }

    const courbeInfos = await prisma.courbeInfo.findMany({
      where: { patientId: Number(patientId) },
      include: {
        consultation: {
          select: {
            id: true,
            createdAt: true,
            note: true,
            motifDeConsultation: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(courbeInfos);
  } catch (error) {
    console.error("❌ GET /api/courbe-info error:", error);
    return NextResponse.json(
      { error: "Échec de la récupération des données de courbe" },
      { status: 500 },
    );
  }
}

// =========================================================================
// POST /api/courbe-info
// Create a standalone growth measurement directly from Courbe (consultationId = null)
// =========================================================================
export async function POST(req) {
  try {
    const data = await req.json();
    const { patientId, poids, taille, perimetreCranien, createdAt } = data;

    if (!patientId) {
      return NextResponse.json(
        { error: "L'identifiant du patient (patientId) est requis" },
        { status: 400 },
      );
    }

    const numPatientId = Number(patientId);
    const patient = await prisma.patient.findUnique({
      where: { id: numPatientId },
      select: { id: true, dateDeNaissance: true },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient introuvable" },
        { status: 404 },
      );
    }

    const measurementDate = createdAt ? new Date(createdAt) : new Date();
    const computedAge = calculateAge(patient.dateDeNaissance, measurementDate);
    const finalAge = data.age && typeof data.age === "string" && data.age.trim() ? data.age.trim() : computedAge;

    const parsedPoids =
      poids !== undefined && poids !== null && poids !== ""
        ? parseFloat(poids)
        : null;
    const parsedTaille =
      taille !== undefined && taille !== null && taille !== ""
        ? parseFloat(taille)
        : null;
    const parsedPC =
      perimetreCranien !== undefined &&
      perimetreCranien !== null &&
      perimetreCranien !== ""
        ? parseFloat(perimetreCranien)
        : null;

    const newRecord = await prisma.courbeInfo.create({
      data: {
        patientId: numPatientId,
        consultationId: null,
        age: finalAge,
        poids: parsedPoids,
        taille: parsedTaille,
        perimetreCranien: parsedPC,
        createdAt: measurementDate,
      },
      include: {
        consultation: {
          select: { id: true, createdAt: true },
        },
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/courbe-info error:", error);
    return NextResponse.json(
      { error: "Échec de l'ajout de la mesure de courbe" },
      { status: 500 },
    );
  }
}

// =========================================================================
// PUT /api/courbe-info
// Modify a growth measurement + Bidirectional sync with Consultation if linked
// =========================================================================
export async function PUT(req) {
  try {
    const data = await req.json();
    const { id, poids, taille, perimetreCranien, createdAt, age } = data;

    if (!id) {
      return NextResponse.json(
        { error: "L'identifiant de la mesure (id) est requis" },
        { status: 400 },
      );
    }

    const numId = Number(id);
    const existing = await prisma.courbeInfo.findUnique({
      where: { id: numId },
      include: { patient: { select: { dateDeNaissance: true } } },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Mesure de courbe introuvable" },
        { status: 404 },
      );
    }

    const measurementDate = createdAt
      ? new Date(createdAt)
      : existing.createdAt;
    const computedAge = calculateAge(
      existing.patient?.dateDeNaissance,
      measurementDate,
    );
    const finalAge = age && typeof age === "string" && age.trim() ? age.trim() : (existing.age || computedAge);

    const parsedPoids =
      poids !== undefined
        ? poids !== null && poids !== ""
          ? parseFloat(poids)
          : null
        : existing.poids;
    const parsedTaille =
      taille !== undefined
        ? taille !== null && taille !== ""
          ? parseFloat(taille)
          : null
        : existing.taille;
    const parsedPC =
      perimetreCranien !== undefined
        ? perimetreCranien !== null && perimetreCranien !== ""
          ? parseFloat(perimetreCranien)
          : null
        : existing.perimetreCranien;

    // Execute in a transaction to guarantee bidirectional consistency
    const result = await prisma.$transaction(async (tx) => {
      const updatedCourbe = await tx.courbeInfo.update({
        where: { id: numId },
        data: {
          age: finalAge,
          poids: parsedPoids,
          taille: parsedTaille,
          perimetreCranien: parsedPC,
          createdAt: measurementDate,
        },
        include: {
          consultation: {
            select: { id: true, createdAt: true, note: true },
          },
        },
      });

      // ✅ Bidirectional sync: if linked to a consultation, update consultation growth fields
      if (updatedCourbe.consultationId) {
        await tx.consultation.update({
          where: { id: updatedCourbe.consultationId },
          data: {
            poids: parsedPoids,
            taille: parsedTaille,
            perimetreCranien: parsedPC,
          },
        });
      }

      return updatedCourbe;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ PUT /api/courbe-info error:", error);
    return NextResponse.json(
      { error: "Échec de la modification de la mesure de courbe" },
      { status: 500 },
    );
  }
}

// =========================================================================
// DELETE /api/courbe-info?id=123
// Delete a growth measurement + clear consultation fields if linked
// =========================================================================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "L'identifiant (id) est requis" },
        { status: 400 },
      );
    }

    const numId = Number(id);
    const existing = await prisma.courbeInfo.findUnique({
      where: { id: numId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Mesure de courbe introuvable" },
        { status: 404 },
      );
    }

    await prisma.$transaction(async (tx) => {
      // If linked to consultation, clear growth fields in consultation
      if (existing.consultationId) {
        await tx.consultation.update({
          where: { id: existing.consultationId },
          data: {
            poids: null,
            taille: null,
            perimetreCranien: null,
          },
        });
      }

      await tx.courbeInfo.delete({
        where: { id: numId },
      });
    });

    return NextResponse.json({
      message: "Mesure de courbe supprimée avec succès",
      deletedId: numId,
    });
  } catch (error) {
    console.error("❌ DELETE /api/courbe-info error:", error);
    return NextResponse.json(
      { error: "Échec de la suppression de la mesure de courbe" },
      { status: 500 },
    );
  }
}
