import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =====================
// GET /api/medicaments
// =====================
export async function GET() {
  try {
    const medicaments = await prisma.medicament.findMany({
      orderBy: { nom: "asc" },
    });
    return NextResponse.json(medicaments);
  } catch (error) {
    console.error("GET /api/medicaments error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des médicaments." },
      { status: 500 },
    );
  }
}

// =====================
// POST /api/medicaments (Single or Bulk)
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
          { error: "Aucun médicament valide trouvé dans la liste." },
          { status: 400 },
        );
      }

      // Unique names in payload
      const uniqueNames = Array.from(new Set(names));

      // Fetch existing names to skip duplicates
      const existing = await prisma.medicament.findMany({
        where: {
          nom: { in: uniqueNames },
        },
        select: { nom: true },
      });
      const existingSet = new Set(existing.map((e) => e.nom.toLowerCase()));

      const toCreate = uniqueNames.filter(
        (n) => !existingSet.has(n.toLowerCase()),
      );

      if (toCreate.length > 0) {
        await prisma.medicament.createMany({
          data: toCreate.map((nom) => ({ nom })),
          skipDuplicates: true,
        });
      }

      const allMedicaments = await prisma.medicament.findMany({
        orderBy: { nom: "asc" },
      });

      return NextResponse.json(
        {
          success: true,
          addedCount: toCreate.length,
          skippedCount: uniqueNames.length - toCreate.length,
          totalCount: allMedicaments.length,
          medicaments: allMedicaments,
        },
        { status: 201 },
      );
    }

    // 2. Single Item Creation
    const nom = typeof body === "string" ? body.trim() : body?.nom?.trim();

    if (!nom) {
      return NextResponse.json(
        { error: "Le nom du médicament est requis." },
        { status: 400 },
      );
    }

    // Prevent duplicates or return existing
    const existing = await prisma.medicament.findUnique({
      where: { nom },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ce médicament existe déjà dans la liste." },
        { status: 400 },
      );
    }

    const medicament = await prisma.medicament.create({
      data: { nom },
    });

    return NextResponse.json(medicament, { status: 201 });
  } catch (error) {
    console.error("POST /api/medicaments error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du médicament: " + error.message },
      { status: 500 },
    );
  }
}
