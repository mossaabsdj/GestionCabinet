import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
/* =====================
   🟢 GET /api/vaccinations
   ===================== */

export async function GET(req) {
  try {
    // ✅ Extract patientId from the URL query
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    // ✅ Build query conditionally
    const where = patientId ? { patientId: parseInt(patientId) } : {};

    const vaccinations = await prisma.vaccination.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        patient: true,
        vaccine: true,
      },
    });

    return NextResponse.json(vaccinations);
  } catch (error) {
    console.error("❌ Error fetching vaccinations:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des vaccinations" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // ✅ to avoid "too many connections" errors
  }
}

/* =====================
   🟢 POST /api/vaccinations
   ===================== */
export async function POST(req) {
  try {
    const body = await req.json();
    const { patientId, vaccineId, dateGiven, doseNumber, notes } = body;

    if (!patientId || !vaccineId || !dateGiven) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const vaccination = await prisma.vaccination.create({
      data: {
        patientId: Number(patientId),
        vaccineId: Number(vaccineId), // ✅ relation field instead of vaccineName
        dateGiven: new Date(dateGiven),
        doseNumber: doseNumber ? Number(doseNumber) : null,
        notes: notes || null,
      },
      include: {
        vaccine: true,
        patient: true,
      },
    });

    return NextResponse.json(vaccination);
  } catch (error) {
    console.error("❌ Error creating vaccination:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la vaccination" },
      { status: 500 }
    );
  }
}

/* =====================
   🟣 PUT /api/vaccinations
   ===================== */
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, vaccineId, dateGiven, doseNumber, notes } = body;

    if (!id || !vaccineId || !dateGiven) {
      return NextResponse.json(
        { error: "Champs requis manquants pour la mise à jour" },
        { status: 400 }
      );
    }

    const updated = await prisma.vaccination.update({
      where: { id: Number(id) },
      data: {
        vaccineId: Number(vaccineId), // ✅ update relation instead of name
        dateGiven: new Date(dateGiven),
        doseNumber: doseNumber ? Number(doseNumber) : null,
        notes: notes || null,
      },
      include: {
        vaccine: true,
        patient: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating vaccination:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la vaccination" },
      { status: 500 }
    );
  }
}

/* =====================
   🔴 DELETE /api/vaccinations?id=1
   ===================== */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de la vaccination requis" },
        { status: 400 }
      );
    }

    await prisma.vaccination.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Vaccination supprimée avec succès" });
  } catch (error) {
    console.error("❌ Error deleting vaccination:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la vaccination" },
      { status: 500 }
    );
  }
}
