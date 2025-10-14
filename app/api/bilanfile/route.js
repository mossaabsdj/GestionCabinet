import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// ✅ Get all BilanFiles (include consultation + patient)
export async function GET() {
  try {
    const bilans = await prisma.bilanFile.findMany({
      include: {
        patient: true, // include direct patient relation
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bilans);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Create new BilanFile (auto-link patientId from consultation)
export async function POST(req) {
  try {
    const { consultationId, patientId, type, description, fichier } =
      await req.json();

    // Find patientId from consultation

    const newBilan = await prisma.bilanFile.create({
      data: {
        consultationId: consultationId || null, // ✅ set null if undefined or empty
        patientId, // auto-link patient
        type,
        description,
        fichier,
      },
    });

    return NextResponse.json(newBilan);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update a BilanFile (expects ?id=)
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));
    const data = await req.json();

    const updatedBilan = await prisma.bilanFile.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedBilan);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete a BilanFile (expects ?id=)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    await prisma.bilanFile.delete({ where: { id } });

    return NextResponse.json({ message: "BilanFile deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
