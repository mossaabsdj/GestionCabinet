import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =====================
// GET /api/Vaccine
// =====================
export async function GET() {
  try {
    const vaccines = await prisma.vaccine.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(vaccines);
  } catch (error) {
    console.error("GET /api/Vaccine error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des vaccins." },
      { status: 500 },
    );
  }
}

// =====================
// POST /api/Vaccine (Single or Bulk)
// =====================
export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Bulk / Array Import
    if (Array.isArray(body) || (body && Array.isArray(body.items))) {
      const items = Array.isArray(body) ? body : body.items;
      const names = items
        .map((it) => (typeof it === "string" ? it : it?.name || it?.nom))
        .filter((n) => n && typeof n === "string" && n.trim().length > 0)
        .map((n) => n.trim());

      if (names.length === 0) {
        return NextResponse.json(
          { error: "Aucun vaccin valide trouvé dans la liste." },
          { status: 400 },
        );
      }

      const uniqueNames = Array.from(new Set(names));

      const existing = await prisma.vaccine.findMany({
        where: { name: { in: uniqueNames } },
        select: { name: true },
      });
      const existingSet = new Set(existing.map((e) => e.name.toLowerCase()));

      const toCreate = uniqueNames.filter(
        (n) => !existingSet.has(n.toLowerCase()),
      );

      if (toCreate.length > 0) {
        await prisma.vaccine.createMany({
          data: toCreate.map((name) => ({ name })),
          skipDuplicates: true,
        });
      }

      const allVaccines = await prisma.vaccine.findMany({
        orderBy: { name: "asc" },
      });

      return NextResponse.json(
        {
          success: true,
          addedCount: toCreate.length,
          skippedCount: uniqueNames.length - toCreate.length,
          totalCount: allVaccines.length,
          vaccines: allVaccines,
        },
        { status: 201 },
      );
    }

    // 2. Single Item Creation
    const name =
      typeof body === "string"
        ? body.trim()
        : body?.name?.trim() || body?.nom?.trim();

    if (!name || name === "") {
      return NextResponse.json(
        { error: "Le nom du vaccin est requis." },
        { status: 400 },
      );
    }

    const existing = await prisma.vaccine.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce vaccin existe déjà dans la liste." },
        { status: 400 },
      );
    }

    const vaccine = await prisma.vaccine.create({
      data: { name },
    });

    return NextResponse.json(vaccine, { status: 201 });
  } catch (error) {
    console.error("POST /api/Vaccine error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l’ajout du vaccin: " + error.message },
      { status: 500 },
    );
  }
}

// =====================
// DELETE /api/Vaccine?id=3
// =====================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "ID du vaccin manquant." },
        { status: 400 },
      );
    }

    await prisma.vaccine.delete({ where: { id } });
    return NextResponse.json({ message: "Vaccin supprimé avec succès." });
  } catch (error) {
    console.error("DELETE /api/Vaccine error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du vaccin: " + error.message },
      { status: 500 },
    );
  }
}
