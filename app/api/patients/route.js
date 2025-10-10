import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// =====================
// GET /api/patients
// =====================
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        consultations: true,
        ordonnances: true,
        bilans: true,
        paiements: true,
      },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error("❌ Error fetching patients:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des patients" },
      { status: 500 }
    );
  }
}

// =====================
// POST /api/patients
// =====================
export async function POST(req) {
  try {
    const body = await req.json();
    const { nom, age, telephone, adresse, antecedents, groupeSanguin } = body;

    if (!nom || nom.trim() === "") {
      return NextResponse.json({ error: "Nom est requis" }, { status: 400 });
    }

    const patient = await prisma.patient.create({
      data: {
        nom,
        age: age || null,
        telephone: telephone || null,
        adresse: adresse || null,
        antecedents: antecedents || null,
        groupeSanguin: groupeSanguin || null, // <- assign enum value directly
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error("❌ Error creating patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du patient" },
      { status: 500 }
    );
  }
}

// =====================
// PUT /api/patients
// =====================
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, nom, age, telephone, adresse, antecedents, groupeSanguinId } =
      body;

    if (!id || !nom || nom.trim() === "") {
      return NextResponse.json(
        { error: "ID et nom sont requis" },
        { status: 400 }
      );
    }

    const updated = await prisma.patient.update({
      where: { id: Number(id) },
      data: {
        nom,
        age: age || null,
        telephone: telephone || null,
        adresse: adresse || null,
        antecedents: antecedents || null,
        groupeSanguin: groupeSanguinId
          ? { connect: { id: Number(groupeSanguinId) } }
          : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}

// =====================
// DELETE /api/patients?id=1
// =====================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient requis" },
        { status: 400 }
      );
    }

    await prisma.patient.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Patient supprimé avec succès" });
  } catch (error) {
    console.error("❌ Error deleting patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du patient" },
      { status: 500 }
    );
  }
}
