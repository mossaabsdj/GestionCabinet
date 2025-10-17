import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        consultations: {
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
            bilanRecip: true,
          },
        },
        ordonnances: {
          include: {
            items: {
              include: { medicament: true },
            },
          },
        },
        bilans: true,
        paiements: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // ✅ Format result
    const formatted = patients.map((p) => ({
      id: p.id,
      nom: p.nom,
      age: p.age,
      telephone: p.telephone,
      adresse: p.adresse,
      antecedents: p.antecedents,
      groupeSanguin: p.groupeSanguin,
      createdAt: p.createdAt,

      consultations: p.consultations.map((c) => ({
        id: c.id,
        note: c.note,
        taille: c.taille,
        poids: c.poids,
        tension: `${c.tensionSystolique ?? ""}/${c.tensionDiastolique ?? ""}`,
        temperature: c.temperature,
        frequenceCardiaque: c.frequenceCardiaque,
        frequenceRespiratoire: c.frequenceRespiratoire,
        saturationOxygene: c.saturationOxygene,
        glycemie: c.glycemie,
        createdAt: c.createdAt,

        radios: c.radios.map((r) => ({
          id: r.id,
          type: r.type,
          file: r.file || null,
        })),

        bilansFiles: c.bilansFiles.map((b) => ({
          id: b.id,
          file: b.file,
          type: b.type,
        })),

        ordonnance: c.ordonnance
          ? {
              id: c.ordonnance.id,
              items: c.ordonnance.items.map((item) => ({
                id: item.medicament.id,
                nom: item.medicament.nom || null,
                dosage: item.dosage,
                frequence: item.frequence,
                duree: item.duree,
                quantite: item.quantite,
              })),
            }
          : null,

        bilanRecip: c.bilanRecip
          ? {
              id: c.bilanRecip.id,
              result: c.bilanRecip.result || null,
              date: c.bilanRecip.createdAt,
            }
          : null,
      })),

      ordonnances: p.ordonnances.map((o) => ({
        id: o.id,
        createdAt: o.createdAt,
        items: o.items.map((item) => ({
          id: item.medicament.id,
          nom: item.medicament.nom || null,
          dosage: item.dosage,
          frequence: item.frequence,
          duree: item.duree,
          quantite: item.quantite,
        })),
      })),

      bilans: p.bilans.map((b) => ({
        id: b.id,
        result: b.result || null,
        createdAt: b.createdAt,
      })),

      paiements: p.paiements.map((pay) => ({
        id: pay.id,
        montant: pay.montant,
        date: pay.createdAt,
        mode: pay.mode || null,
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
