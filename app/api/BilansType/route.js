import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
// ✅ GET — Fetch all bilan types
export async function GET() {
  try {
    const bilans = await prisma.bilanType.findMany({
      include: {
        items: {
          include: {
            bilan: {
              select: { id: true, nom: true }, // only include bilan name
            },
          },
        },
      },
      orderBy: { id: "desc" },
    });
    console.log(JSON.stringify(bilans));
    // Clean response (remove internal IDs)
    const formatted = bilans.map((b) => ({
      id: b.id,
      nom: b.nom,
      items: b.items.map((item) => ({
        id: item.bilan.id || null,
        nom: item.bilan.nom || null,
        remarque: item.remarque || null,
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching bilan types:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des bilans types" },
      { status: 500 }
    );
  }
}

// ✅ POST — Create a new bilan type
export async function POST(req) {
  try {
    const body = await req.json();
    const { nom, items } = body;

    if (!nom || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Nom et items sont requis" },
        { status: 400 }
      );
    }

    const newBilan = await prisma.bilanType.create({
      data: {
        nom,
        items: {
          create: items.map((item) => ({
            bilanId: Number(item.bilanId),
            remarque: item.remarque || null,
          })),
        },
      },
      include: {
        items: {
          include: { bilan: { select: { nom: true } } },
        },
      },
    });

    // Format response
    const formatted = {
      id: newBilan.id,
      nom: newBilan.nom,
      items: newBilan.items.map((i) => ({
        bilanNom: i.bilan.nom || null,
        remarque: i.remarque || null,
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Error creating bilan type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du type de bilan" },
      { status: 500 }
    );
  }
}

// ✅ PUT — Update existing bilan type
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, nom, items } = body;

    if (!id || !nom) {
      return NextResponse.json(
        { error: "ID et nom sont requis" },
        { status: 400 }
      );
    }

    // Delete old items to resync
    await prisma.bilanTypeItem.deleteMany({
      where: { bilanTypeId: Number(id) },
    });

    const updated = await prisma.bilanType.update({
      where: { id: Number(id) },
      data: {
        nom,
        items: {
          create: items.map((item) => ({
            bilanId: Number(item.bilanId),
            remarque: item.remarque || null,
          })),
        },
      },
      include: {
        items: {
          include: { bilan: { select: { nom: true } } },
        },
      },
    });

    const formatted = {
      id: updated.id,
      nom: updated.nom,
      items: updated.items.map((i) => ({
        bilanNom: i.bilan.nom || null,
        remarque: i.remarque || null,
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Error updating bilan type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du type de bilan" },
      { status: 500 }
    );
  }
}

// ✅ DELETE — Delete a bilan type by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du type de bilan requis" },
        { status: 400 }
      );
    }

    // 🔹 Step 1: Delete all related items first
    await prisma.bilanTypeItem.deleteMany({
      where: { bilanTypeId: Number(id) },
    });

    // 🔹 Step 2: Delete the bilan type itself
    await prisma.bilanType.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Type de bilan supprimé avec succès" });
  } catch (error) {
    console.error("❌ Error deleting bilan type:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du type de bilan" },
      { status: 500 }
    );
  }
}
