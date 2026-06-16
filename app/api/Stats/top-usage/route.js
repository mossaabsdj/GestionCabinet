export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // --- Top Médicaments ---
    const topMedications = await prisma.ordonnanceItem.groupBy({
      by: ["medicamentId"],
      _count: { medicamentId: true },
      orderBy: { _count: { medicamentId: "desc" } },
      take: 10, // top 10
    });

    // Enrich with medication names
    const medsWithNames = await Promise.all(
      topMedications.map(async (item) => {
        const med = await prisma.medicament.findUnique({
          where: { id: item.medicamentId },
          select: { nom: true },
        });
        return {
          name: med.nom || "Inconnu",
          value: item._count.medicamentId,
        };
      })
    );

    // --- Top Bilans ---
    const topBilans = await prisma.bilanItem.groupBy({
      by: ["bilanId"],
      _count: { bilanId: true },
      orderBy: { _count: { bilanId: "desc" } },
      take: 10,
    });

    // Enrich with bilan names
    const bilansWithNames = await Promise.all(
      topBilans.map(async (item) => {
        const bilan = await prisma.bilan.findUnique({
          where: { id: item.bilanId },
          select: { nom: true },
        });
        return {
          name: bilan.nom || "Inconnu",
          value: item._count.bilanId,
        };
      })
    );

    // --- Response ---
    return NextResponse.json({
      topMedications: medsWithNames,
      topBilans: bilansWithNames,
    });
  } catch (error) {
    console.error("Error fetching top usages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

