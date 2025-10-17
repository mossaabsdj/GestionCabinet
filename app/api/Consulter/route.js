import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ====================
// GET consultations (all or by patientId)
// ====================
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");

  try {
    const consultations = await prisma.consultation.findMany({
      where: patientId ? { patientId: Number(patientId) } : {},
      include: {
        radios: true,
        bilansFiles: true,
        ordonnance: {
          include: {
            items: {
              include: { medicament: true },
            },
          },
        },
        bilanRecip: {
          include: {
            items: {
              include: { bilan: true },
            },
          },
        },
        patient: { select: { id: true, nom: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("GET consultations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}

// ====================
// POST: Create new consultation
// ====================

export async function POST(req) {
  try {
    const data = await req.json();

    // Convert to numeric types safely
    const taille = data.taille ? parseFloat(data.taille) : null;
    const poids = data.poids ? parseFloat(data.poids) : null;
    const tensionSystolique = data.tensionSystolique
      ? parseInt(data.tensionSystolique)
      : null;
    const tensionDiastolique = data.tensionDiastolique
      ? parseInt(data.tensionDiastolique)
      : null;
    const temperature = data.temperature ? parseFloat(data.temperature) : null;
    const frequenceCardiaque = data.frequenceCardiaque
      ? parseInt(data.frequenceCardiaque)
      : null;
    const frequenceRespiratoire = data.frequenceRespiratoire
      ? parseInt(data.frequenceRespiratoire)
      : null;
    const saturationOxygene = data.saturationOxygene
      ? parseInt(data.saturationOxygene)
      : null;
    const glycemie = data.glycemie ? parseFloat(data.glycemie) : null;

    const consultation = await prisma.consultation.create({
      data: {
        patientId: data.patientId,
        note: data.note,
        taille,
        poids,
        tensionSystolique,
        tensionDiastolique,
        temperature,
        frequenceCardiaque,
        frequenceRespiratoire,
        saturationOxygene,
        glycemie,
        developpementPsychomoteur: data.developpementPsychomoteur || null, // ✅ new field

        // ✅ Ordonnance
        ordonnance: data.ordonnance
          ? {
              create: {
                patientId: data.patientId,
                items: {
                  create: data.ordonnance.items.map((item) => ({
                    medicamentId: item.medicamentId,
                    dosage: item.dosage,
                    frequence: item.frequence,
                    duree: item.duree,
                    quantite: parseInt(item.quantite) || 0,
                  })),
                },
              },
            }
          : undefined,

        // ✅ BilanRecip
        bilanRecip: data.bilanRecip
          ? {
              create: {
                patientId: data.patientId,
                items: {
                  create: data.bilanRecip.items.map((item) => ({
                    bilanId: item.bilanId,
                    resultat: item.resultat,
                    remarque: item.remarque,
                  })),
                },
              },
            }
          : undefined,
      },
      include: {
        ordonnance: { include: { items: true } },
        bilanRecip: { include: { items: true } },
      },
    });

    return NextResponse.json(consultation);
  } catch (error) {
    console.error("POST consultation error:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    const {
      id,
      patientId,
      note,
      taille,
      poids,
      tensionSystolique,
      tensionDiastolique,
      temperature,
      frequenceCardiaque,
      frequenceRespiratoire,
      saturationOxygene,
      glycemie,
      developpementPsychomoteur,
    } = data;

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de la consultation est requis" },
        { status: 400 }
      );
    }

    // 🧠 Prepare data for update — only defined fields
    const updateData = {
      ...(patientId !== undefined && { patientId: Number(patientId) }),
      ...(note !== undefined && { note }),
      ...(taille !== undefined && {
        taille: taille ? parseFloat(taille) : null,
      }),
      ...(poids !== undefined && { poids: poids ? parseFloat(poids) : null }),
      ...(tensionSystolique !== undefined && {
        tensionSystolique: tensionSystolique
          ? parseInt(tensionSystolique)
          : null,
      }),
      ...(tensionDiastolique !== undefined && {
        tensionDiastolique: tensionDiastolique
          ? parseInt(tensionDiastolique)
          : null,
      }),
      ...(temperature !== undefined && {
        temperature: temperature ? parseFloat(temperature) : null,
      }),
      ...(frequenceCardiaque !== undefined && {
        frequenceCardiaque: frequenceCardiaque
          ? parseInt(frequenceCardiaque)
          : null,
      }),
      ...(frequenceRespiratoire !== undefined && {
        frequenceRespiratoire: frequenceRespiratoire
          ? parseInt(frequenceRespiratoire)
          : null,
      }),
      ...(saturationOxygene !== undefined && {
        saturationOxygene: saturationOxygene
          ? parseInt(saturationOxygene)
          : null,
      }),
      ...(glycemie !== undefined && {
        glycemie: glycemie ? parseFloat(glycemie) : null,
      }),
      ...(developpementPsychomoteur !== undefined && {
        developpementPsychomoteur,
      }),
    };

    // 💾 Update only the consultation record
    const updated = await prisma.consultation.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PUT consultation error:", error);
    return NextResponse.json(
      { error: "Échec de la mise à jour de la consultation" },
      { status: 500 }
    );
  }
}

// ====================
// DELETE: Delete consultation + related data
// ====================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.ordonnanceItem.deleteMany({
        where: {
          ordonnance: { consultationId: Number(id) },
        },
      }),

      prisma.bilanItem.deleteMany({
        where: {
          bilanRecip: { consultationId: Number(id) },
        },
      }),
      prisma.radio.deleteMany({ where: { consultationId: Number(id) } }),
      prisma.bilanFile.deleteMany({ where: { consultationId: Number(id) } }),
      prisma.ordonnance.deleteMany({ where: { consultationId: Number(id) } }),
      prisma.bilanRecip.deleteMany({ where: { consultationId: Number(id) } }),
      prisma.consultation.delete({ where: { id: Number(id) } }),
    ]);

    return NextResponse.json({ message: "Consultation deleted successfully" });
  } catch (error) {
    console.error("DELETE consultation error:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" },
      { status: 500 }
    );
  }
}
