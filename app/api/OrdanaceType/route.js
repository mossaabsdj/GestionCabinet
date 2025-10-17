import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================
// GET /api/recettes
// =====================
export async function GET() {
  try {
    const recettes = await prisma.recetteType.findMany({
      include: {
        items: {
          include: {
            medicament: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });
    const formatted = recettes.map((recette) => ({
      id: recette.id,
      nom: recette.nom,
      items: recette.items.map((item) => ({
        id: item.medicament.id,
        nom: item.medicament.nom || null,
        dosage: item.dosage,
        frequence: item.frequence,
        duree: item.duree,
        quantite: item.quantite,
      })),
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching recettes:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des recettes types" },
      { status: 500 }
    );
  }
}

// =====================
// POST /api/recettes
// =====================
export async function POST(req) {
  try {
    const body = await req.json();
    const { nom, items } = body;

    if (!nom || nom.trim() === "") {
      return NextResponse.json(
        { error: "Le nom de la recette est requis" },
        { status: 400 }
      );
    }

    // Create RecetteType with nested items
    const recette = await prisma.recetteType.create({
      data: {
        nom,
        items: {
          create: items.map((item) => ({
            medicamentId: Number(item.medicamentId),
            dosage: item.dosage,
            frequence: item.frequence,
            duree: item.duree,
            quantite: item.quantite ? Number(item.quantite) : null,
          })),
        },
      },
      include: {
        items: {
          include: { medicament: true },
        },
      },
    });

    return NextResponse.json(recette);
  } catch (error) {
    console.error("❌ Error creating recette:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la recette" },
      { status: 500 }
    );
  }
}

// =====================
// PUT /api/recettes
// =====================
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, nom, items } = body;

    if (!id || !nom) {
      return NextResponse.json(
        { error: "ID et nom sont requis" },
        { status: 400 }
      );
    }

    // Delete old items and recreate them (simpler sync method)
    await prisma.recetteTypeItem.deleteMany({
      where: { recetteId: Number(id) },
    });

    const updated = await prisma.recetteType.update({
      where: { id: Number(id) },
      data: {
        nom,
        items: {
          create: items.map((item) => ({
            medicamentId: Number(item.medicamentId),
            dosage: item.dosage,
            frequence: item.frequence,
            duree: item.duree,
            quantite: item.quantite ? Number(item.quantite) : null,
          })),
        },
      },
      include: {
        items: {
          include: { medicament: true },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating recette:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la recette" },
      { status: 500 }
    );
  }
}

// =====================
// DELETE /api/recettes?id=1
// =====================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de la recette requis" },
        { status: 400 }
      );
    }

    await prisma.recetteTypeItem.deleteMany({
      where: { recetteId: Number(id) },
    });

    await prisma.recetteType.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    console.error("❌ Error deleting recette:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la recette" },
      { status: 500 }
    );
  }
}
