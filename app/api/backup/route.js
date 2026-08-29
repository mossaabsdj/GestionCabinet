import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup_amel_${timestamp}.json`;

    // Retrieve all data across tables
    const [
      patients,
      consultations,
      ordonnances,
      ordonnanceItems,
      medicaments,
      bilans,
      bilanRecips,
      bilanItems,
      bilanTypes,
      bilanTypeItems,
      recetteTypes,
      recetteTypeItems,
      paiements,
      vaccines,
      vaccinations,
      radios,
      bilanFiles,
    ] = await Promise.all([
      prisma.patient.findMany(),
      prisma.consultation.findMany(),
      prisma.ordonnance.findMany(),
      prisma.ordonnanceItem.findMany(),
      prisma.medicament.findMany(),
      prisma.bilan.findMany(),
      prisma.bilanRecip.findMany(),
      prisma.bilanItem.findMany(),
      prisma.bilanType.findMany(),
      prisma.bilanTypeItem.findMany(),
      prisma.recetteType.findMany(),
      prisma.recetteTypeItem.findMany(),
      prisma.paiement.findMany(),
      prisma.vaccine.findMany(),
      prisma.vaccination.findMany(),
      prisma.radio.findMany(),
      prisma.bilanFile.findMany(),
    ]);

    const backupPayload = {
      app: "pediatre",
      version: "4.0.2",
      exportedAt: new Date().toISOString(),
      data: {
        patients,
        consultations,
        ordonnances,
        ordonnanceItems,
        medicaments,
        bilans,
        bilanRecips,
        bilanItems,
        bilanTypes,
        bilanTypeItems,
        recetteTypes,
        recetteTypeItems,
        paiements,
        vaccines,
        vaccinations,
        radios,
        bilanFiles,
      },
    };

    return new Response(JSON.stringify(backupPayload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Backup API Error:", error);
    return NextResponse.json(
      {
        error: "Échec de l'exportation de la base de données: " + error.message,
      },
      { status: 500 },
    );
  }
}
