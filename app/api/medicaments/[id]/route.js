import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();
// ✅ Get one medicament
export async function GET(req, { params }) {
  try {
    const medicament = await prisma.medicament.findUnique({
      where: { id: Number(params.id) },
    });
    if (!medicament) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json(medicament);
  } catch (error) {
    console.error("Error fetching medicament:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

// ✅ Update medicament
export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const medicament = await prisma.medicament.update({
      where: { id: Number(params.id) },
      data: { nom: data.nom },
    });
    return NextResponse.json(medicament);
  } catch (error) {
    console.error("Error updating medicament:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// ✅ Delete medicament
export async function DELETE(req, { params }) {
  try {
    await prisma.medicament.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting medicament:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
