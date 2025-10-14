import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// ✅ Get all Radios (with consultation + patient info)
export async function GET() {
  try {
    const radios = await prisma.radio.findMany({
      include: {
        patient: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(radios);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Create a new Radio (auto-assign patientId from consultation)
export async function POST(req) {
  try {
    const { consultationId, patientId, description, fichier } =
      await req.json();

    const newRadio = await prisma.radio.create({
      data: {
        consultationId: consultationId || null, // ✅ set null if undefined or empty
        patientId: patientId, // Auto-link to patient
        description,
        fichier: "/app",
      },
    });

    return NextResponse.json(newRadio);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update a Radio (expects ?id=)
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));
    const data = await req.json();

    const updatedRadio = await prisma.radio.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedRadio);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete a Radio (expects ?id=)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    await prisma.radio.delete({ where: { id } });

    return NextResponse.json({ message: "Radio deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
