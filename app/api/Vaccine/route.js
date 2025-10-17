import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const vaccines = await prisma.vaccine.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(vaccines);
  } catch (error) {
    console.error("GET /api/vaccines error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des vaccins" },
      { status: 500 }
    );
  }
}

/**
 * 🟢 POST create a new vaccine
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Le nom du vaccin est requis" },
        { status: 400 }
      );
    }

    // Prevent duplicates
    const existing = await prisma.vaccine.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce vaccin existe déjà" },
        { status: 400 }
      );
    }

    const vaccine = await prisma.vaccine.create({
      data: { name },
    });

    return NextResponse.json(vaccine);
  } catch (error) {
    console.error("POST /api/vaccines error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l’ajout du vaccin" },
      { status: 500 }
    );
  }
}

/**
 * 🔴 DELETE a vaccine by ID (ex: /api/vaccines?id=3)
 */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "ID du vaccin manquant" },
        { status: 400 }
      );
    }

    await prisma.vaccine.delete({ where: { id } });
    return NextResponse.json({ message: "Vaccin supprimé avec succès" });
  } catch (error) {
    console.error("DELETE /api/vaccines error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du vaccin" },
      { status: 500 }
    );
  }
}
