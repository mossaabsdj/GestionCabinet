import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =========================
// ✅ GET all justification types (templates)
// =========================
export async function GET() {
  try {
    const templates = await prisma.justificationType.findMany({
      orderBy: { nom: "asc" },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("❌ Error fetching justification types:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des modèles de justification" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ POST create justification template
// =========================
export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, texte } = body;

    if (!nom || !nom.trim()) {
      return NextResponse.json(
        { error: "Le titre / nom du modèle est requis" },
        { status: 400 },
      );
    }

    if (!texte || !texte.trim()) {
      return NextResponse.json(
        { error: "Le texte du modèle est requis" },
        { status: 400 },
      );
    }

    const existing = await prisma.justificationType.findUnique({
      where: { nom: nom.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un modèle avec ce nom existe déjà" },
        { status: 400 },
      );
    }

    const template = await prisma.justificationType.create({
      data: {
        nom: nom.trim(),
        texte: texte.trim(),
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("❌ Error creating justification type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du modèle de justification" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ PUT update justification template
// =========================
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, nom, texte } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID du modèle manquant" },
        { status: 400 },
      );
    }

    const updated = await prisma.justificationType.update({
      where: { id: Number(id) },
      data: {
        nom: nom ? nom.trim() : undefined,
        texte: texte ? texte.trim() : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating justification type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du modèle" },
      { status: 500 },
    );
  }
}

// =========================
// ✅ DELETE justification template
// =========================
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du modèle manquant" },
        { status: 400 },
      );
    }

    await prisma.justificationType.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Modèle supprimé avec succès" });
  } catch (error) {
    console.error("❌ Error deleting justification type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du modèle" },
      { status: 500 },
    );
  }
}
