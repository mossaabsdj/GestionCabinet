import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

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

    const consultation = await prisma.consultation.create({
      data: {
        patientId: data.patientId,
        note: data.note,
        taille: data.taille,
        poids: data.poids,
        tensionSystolique: data.tensionSystolique,
        tensionDiastolique: data.tensionDiastolique,
        temperature: data.temperature,
        frequenceCardiaque: data.frequenceCardiaque,
        frequenceRespiratoire: data.frequenceRespiratoire,
        saturationOxygene: data.saturationOxygene,
        glycemie: data.glycemie,

        radios: {
          create:
            data.radios.map((r) => ({
              description: r.description,
              fichier: r.fichier,
            })) || [],
        },

        bilansFiles: {
          create:
            data.bilansFiles.map((b) => ({
              type: b.type,
              resultat: b.resultat,
              fichier: b.fichier,
            })) || [],
        },

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
                    quantite: item.quantite,
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
        radios: true,
        bilansFiles: true,
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

// ====================
// PUT: Update consultation
// ====================
export async function PUT(req) {
  try {
    const data = await req.json();
    const { id, ordonnance, bilanRecip, ...consultationData } = data;

    const updated = await prisma.consultation.update({
      where: { id: Number(id) },
      data: {
        ...consultationData,

        // ✅ Update ordonnance (upsert)
        ordonnance: ordonnance
          ? {
              upsert: {
                create: {
                  patientId: consultationData.patientId,
                  items: {
                    create: ordonnance.items.map((item) => ({
                      medicamentId: item.medicamentId,
                      dosage: item.dosage,
                      frequence: item.frequence,
                      duree: item.duree,
                      quantite: item.quantite,
                    })),
                  },
                },
                update: {
                  items: {
                    deleteMany: {},
                    create: ordonnance.items.map((item) => ({
                      medicamentId: item.medicamentId,
                      dosage: item.dosage,
                      frequence: item.frequence,
                      duree: item.duree,
                      quantite: item.quantite,
                    })),
                  },
                },
              },
            }
          : undefined,

        // ✅ Update bilanRecip (upsert)
        bilanRecip: bilanRecip
          ? {
              upsert: {
                create: {
                  patientId: consultationData.patientId,
                  items: {
                    create: bilanRecip.items.map((item) => ({
                      bilanId: item.bilanId,
                      resultat: item.resultat,
                      remarque: item.remarque,
                    })),
                  },
                },
                update: {
                  items: {
                    deleteMany: {},
                    create: bilanRecip.items.map((item) => ({
                      bilanId: item.bilanId,
                      resultat: item.resultat,
                      remarque: item.remarque,
                    })),
                  },
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT consultation error:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
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
