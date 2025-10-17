import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Get all medicaments
export async function GET() {
  try {
    const medicaments = await prisma.medicament.findMany({
      orderBy: { nom: "asc" },
    });
    return NextResponse.json(medicaments);
  } catch (error) {
    console.error("Error fetching medicaments:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement" },
      { status: 500 }
    );
  }
}

// ✅ Create new medicament
export async function POST(req) {
  try {
    const body = await req.json();
    const nom = typeof body === "string" ? body : body.nom;

    if (!nom) {
      return NextResponse.json({ error: "Nom is required" }, { status: 400 });
    }
    const medicament = await prisma.medicament.create({
      data: {
        nom,
      },
    });
    return NextResponse.json(medicament);
  } catch (error) {
    console.error("Error creating medicament:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
