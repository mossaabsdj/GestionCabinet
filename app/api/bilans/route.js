import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================
// GET /api/bilans
// =====================
export async function GET() {
  try {
    const bilans = await prisma.bilan.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bilans);
  } catch (error) {
    console.error("❌ Error fetching bilans:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des bilans" },
      { status: 500 }
    );
  }
}

// =====================
// POST /api/bilans
// =====================
export async function POST(req) {
  try {
    const body = await req.json();
    const nom = typeof body === "string" ? body : body.nom;

    if (!nom || nom.trim() === "") {
      return NextResponse.json({ error: "Nom est requis" }, { status: 400 });
    }

    // Prevent duplicate names
    const existing = await prisma.bilan.findUnique({ where: { nom } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce bilan existe déjà" },
        { status: 400 }
      );
    }

    const bilan = await prisma.bilan.create({
      data: { nom },
    });

    return NextResponse.json(bilan);
  } catch (error) {
    console.error("❌ Error creating bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du bilan" },
      { status: 500 }
    );
  }
}

// =====================
// PUT /api/bilans
// =====================
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, nom } = body;

    if (!id || !nom || nom.trim() === "") {
      return NextResponse.json(
        { error: "ID et nom sont requis" },
        { status: 400 }
      );
    }

    const updated = await prisma.bilan.update({
      where: { id: Number(id) },
      data: { nom },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du bilan" },
      { status: 500 }
    );
  }
}

// =====================
// DELETE /api/bilans?id=1
// =====================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du bilan requis" },
        { status: 400 }
      );
    }

    await prisma.bilan.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Bilan supprimé avec succès" });
  } catch (error) {
    console.error("❌ Error deleting bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du bilan" },
      { status: 500 }
    );
  }
}
