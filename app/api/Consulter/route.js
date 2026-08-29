import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
        rendezVous: { select: { id: true, date: true, description: true } }, // ✅ new relation
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("GET consultations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 },
    );
  }
}

// ====================
// POST: Create new consultation
// ====================
export async function POST(req) {
  try {
    const data = await req.json();

    // Convert numeric types safely
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
    const perimetreCranien = data.perimetreCranien
      ? parseFloat(data.perimetreCranien)
      : null;

    // ✅ Auto-create RendezVous if not provided
    let rendezVousId = data.rendezVousId ? Number(data.rendezVousId) : null;

    if (!rendezVousId && data.rendezVousDate) {
      const rendezVous = await prisma.rendezVous.create({
        data: {
          date: new Date(data.rendezVousDate),
          description: data.rendezVousDescription || "Consultation programmée",
        },
      });
      rendezVousId = rendezVous.id;
    }

    const consultation = await prisma.consultation.create({
      data: {
        patientId: data.patientId,
        note: data.note,
        taille,
        poids,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,

        tensionSystolique,
        tensionDiastolique,
        temperature,
        frequenceCardiaque,
        frequenceRespiratoire,
        saturationOxygene,
        glycemie,
        developpementPsychomoteur: data.developpementPsychomoteur || null,
        motifDeConsultation: data.motifDeConsultation || null,
        justification: data.justification || null,
        perimetreCranien,
        rendezVousId, // ✅ now always set if date given

        // ✅ Ordonnance
        ordonnance: data.ordonnance
          ? {
              create: {
                createdAt: data.createdAt
                  ? new Date(data.createdAt)
                  : undefined,

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
                createdAt: data.createdAt
                  ? new Date(data.createdAt)
                  : undefined,

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
        rendezVous: true,
      },
    });

    return NextResponse.json(consultation);
  } catch (error) {
    console.error("POST consultation error:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 },
    );
  }
}

// ====================
// PUT: Update consultation
// ====================
export async function PUT(req) {
  try {
    const data = await req.json();
    const {
      id,
      patientId,
      note,
      taille,
      createdAt,

      poids,
      tensionSystolique,
      tensionDiastolique,
      temperature,
      frequenceCardiaque,
      frequenceRespiratoire,
      saturationOxygene,
      glycemie,
      developpementPsychomoteur,
      motifDeConsultation,
      justification,
      perimetreCranien,
      rendezVousId,
      rendezVousDate,
      rendezVousDescription,
    } = data;

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de la consultation est requis" },
        { status: 400 },
      );
    }

    // ✅ Build main consultation update data
    const updateData = {
      ...(patientId !== undefined && {
        patient: { connect: { id: Number(patientId) } },
      }),
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
      ...(motifDeConsultation !== undefined && { motifDeConsultation }),
      ...(justification !== undefined && { justification }),
      ...(perimetreCranien !== undefined && {
        perimetreCranien: perimetreCranien
          ? parseFloat(perimetreCranien)
          : null,
        // 🆕 createdAt: only update if provided
        ...(createdAt && { createdAt: new Date(createdAt) }),
      }),
    };

    // ✅ Handle RendezVous (update or create)
    if (rendezVousDate || rendezVousDescription) {
      if (rendezVousId) {
        // Update existing rendezvous
        await prisma.rendezVous.update({
          where: { id: Number(rendezVousId) },
          data: {
            ...(rendezVousDate && { date: new Date(rendezVousDate) }),
            description: rendezVousDescription || "",
          },
        });
      } else {
        // Create a new rendezvous
        const newRendezVous = await prisma.rendezVous.create({
          data: {
            date: rendezVousDate ? new Date(rendezVousDate) : new Date(),
            description: rendezVousDescription || "",
          },
        });
        updateData.rendezVous = { connect: { id: newRendezVous.id } };
      }
    } else if (rendezVousId) {
      // Clear existing rendezvous
      updateData.rendezVous = { disconnect: true }; // or delete if you want to remove
    }

    // ✅ Update consultation with new data
    const updated = await prisma.consultation.update({
      where: { id: Number(id) },
      data: updateData,
      include: { rendezVous: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PUT consultation error:", error);
    return NextResponse.json(
      { error: "Échec de la mise à jour de la consultation" },
      { status: 500 },
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
      { status: 500 },
    );
  }
}
