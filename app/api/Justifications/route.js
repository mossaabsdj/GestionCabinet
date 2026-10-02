import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =========================
// ✅ GET all or by patientId
// =========================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    const justifications = await prisma.justification.findMany({
      where: patientId ? { patientId: Number(patientId) } : {},
      include: {
        patient: true,
        consultation: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(justifications);
  } catch (error) {
    console.error("❌ Error fetching justifications:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des justifications" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ POST create justification
// =========================
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      patientId,
      consultationId,
      titre,
      texte,
      dateDebut,
      dateFin,
      duree,
      createdAt,
    } = body;

    if (!patientId || !texte || !texte.trim()) {
      return NextResponse.json(
        { error: "Le patient et le texte de justification sont requis" },
        { status: 400 },
      );
    }

    const newJustification = await prisma.justification.create({
      data: {
        patientId: Number(patientId),
        consultationId: consultationId ? Number(consultationId) : null,
        titre: titre || "Justification médicale",
        texte: texte.trim(),
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
        duree: duree || null,
        createdAt: createdAt ? new Date(createdAt) : undefined,
      },
      include: {
        patient: true,
        consultation: true,
      },
    });

    return NextResponse.json(newJustification);
  } catch (error) {
    console.error("❌ Error creating justification:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la justification" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ PUT update justification
// =========================
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, titre, texte, dateDebut, dateFin, duree } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID de justification manquant" },
        { status: 400 },
      );
    }

    const updated = await prisma.justification.update({
      where: { id: Number(id) },
      data: {
        titre: titre || undefined,
        texte: texte !== undefined ? texte.trim() : undefined,
        dateDebut: dateDebut !== undefined ? (dateDebut ? new Date(dateDebut) : null) : undefined,
        dateFin: dateFin !== undefined ? (dateFin ? new Date(dateFin) : null) : undefined,
        duree: duree !== undefined ? duree : undefined,
      },
      include: {
        patient: true,
        consultation: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating justification:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la justification" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ DELETE justification
// =========================
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de justification manquant" },
        { status: 400 },
      );
    }

    await prisma.justification.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Justification supprimée avec succès" });
  } catch (error) {
    console.error("❌ Error deleting justification:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la justification" },
      { status: 500 },
    );
  }
}
