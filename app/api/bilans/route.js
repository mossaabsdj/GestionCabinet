import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =====================
// GET /api/bilans
// =====================
export async function GET() {
  try {
    const bilans = await prisma.bilan.findMany({
      orderBy: { nom: "asc" },
    });
    return NextResponse.json(bilans);
  } catch (error) {
    console.error("❌ Error fetching bilans:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des bilans." },
      { status: 500 },
    );
  }
}

// =====================
// POST /api/bilans (Single or Bulk)
// =====================
export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Bulk / Array Import
    if (Array.isArray(body) || (body && Array.isArray(body.items))) {
      const items = Array.isArray(body) ? body : body.items;
      const names = items
        .map((it) => (typeof it === "string" ? it : it?.nom || it?.name))
        .filter((n) => n && typeof n === "string" && n.trim().length > 0)
        .map((n) => n.trim());

      if (names.length === 0) {
        return NextResponse.json(
          { error: "Aucun bilan valide trouvé dans la liste." },
          { status: 400 },
        );
      }

      const uniqueNames = Array.from(new Set(names));

      const existing = await prisma.bilan.findMany({
        where: { nom: { in: uniqueNames } },
        select: { nom: true },
      });
      const existingSet = new Set(existing.map((e) => e.nom.toLowerCase()));

      const toCreate = uniqueNames.filter(
        (n) => !existingSet.has(n.toLowerCase()),
      );

      if (toCreate.length > 0) {
        await prisma.bilan.createMany({
          data: toCreate.map((nom) => ({ nom })),
          skipDuplicates: true,
        });
      }

      const allBilans = await prisma.bilan.findMany({
        orderBy: { nom: "asc" },
      });

      return NextResponse.json(
        {
          success: true,
          addedCount: toCreate.length,
          skippedCount: uniqueNames.length - toCreate.length,
          totalCount: allBilans.length,
          bilans: allBilans,
        },
        { status: 201 },
      );
    }

    // 2. Single Item Creation
    const nom = typeof body === "string" ? body.trim() : body?.nom?.trim();

    if (!nom || nom === "") {
      return NextResponse.json(
        { error: "Le nom du bilan est requis." },
        { status: 400 },
      );
    }

    const existing = await prisma.bilan.findUnique({ where: { nom } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce bilan existe déjà dans la liste." },
        { status: 400 },
      );
    }

    const bilan = await prisma.bilan.create({
      data: { nom },
    });

    return NextResponse.json(bilan, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du bilan: " + error.message },
      { status: 500 },
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
        { error: "ID et nom sont requis." },
        { status: 400 },
      );
    }

    const updated = await prisma.bilan.update({
      where: { id: Number(id) },
      data: { nom: nom.trim() },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du bilan: " + error.message },
      { status: 500 },
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
        { error: "ID du bilan requis." },
        { status: 400 },
      );
    }

    await prisma.bilan.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Bilan supprimé avec succès." });
  } catch (error) {
    console.error("❌ Error deleting bilan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du bilan: " + error.message },
      { status: 500 },
    );
  }
}
