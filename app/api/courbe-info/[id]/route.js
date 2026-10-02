import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateAge } from "@/lib/age";

export const dynamic = "force-dynamic";

// =========================================================================
// GET /api/courbe-info/:id
// =========================================================================
export async function GET(req, { params }) {
  try {
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const record = await prisma.courbeInfo.findUnique({
      where: { id: Number(id) },
      include: {
        consultation: true,
        patient: { select: { id: true, nom: true, dateDeNaissance: true } },
      },
    });

    if (!record) {
      return NextResponse.json({ error: "Mesure introuvable" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("❌ GET /api/courbe-info/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =========================================================================
// PUT /api/courbe-info/:id
// =========================================================================
export async function PUT(req, { params }) {
  try {
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const data = await req.json();
    const numId = Number(id);

    const existing = await prisma.courbeInfo.findUnique({
      where: { id: numId },
      include: { patient: { select: { dateDeNaissance: true } } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Mesure introuvable" }, { status: 404 });
    }

    const { poids, taille, perimetreCranien, createdAt, age } = data;
    const measurementDate = createdAt ? new Date(createdAt) : existing.createdAt;
    const computedAge = calculateAge(existing.patient?.dateDeNaissance, measurementDate);
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
    console.error("❌ PUT /api/courbe-info/[id] error:", error);
    return NextResponse.json({ error: "Échec de la modification" }, { status: 500 });
  }
}

// =========================================================================
// DELETE /api/courbe-info/:id
// =========================================================================
export async function DELETE(req, { params }) {
  try {
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const numId = Number(id);
    const existing = await prisma.courbeInfo.findUnique({
      where: { id: numId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Mesure introuvable" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
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
      message: "Mesure supprimée avec succès",
      deletedId: numId,
    });
  } catch (error) {
    console.error("❌ DELETE /api/courbe-info/[id] error:", error);
    return NextResponse.json({ error: "Échec de la suppression" }, { status: 500 });
  }
}
