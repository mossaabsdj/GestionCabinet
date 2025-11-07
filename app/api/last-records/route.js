export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// GET last consultation + last ordonnance + last bilan (global, no patientId)
// =========================
export async function GET() {
  try {
    // 🩺 Get the most recent consultation
    const lastConsultation = await prisma.consultation.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, patientId: true },
    });

    // 💊 Get the most recent ordonnance
    const lastOrdonnance = await prisma.ordonnance.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, patientId: true },
    });

    // 🧪 Get the most recent bilan (BilanRecip)
    const lastBilan = await prisma.bilanRecip.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, patientId: true },
    });

    // ✅ Return all last IDs
    return NextResponse.json({
      lastConsultationId: lastConsultation.id || null,
      lastOrdonnanceId: lastOrdonnance.id || null,
      lastBilanId: lastBilan.id || null,
      lastConsultationPatientId: lastConsultation.patientId || null,
      lastOrdonnancePatientId: lastOrdonnance.patientId || null,
      lastBilanPatientId: lastBilan.patientId || null,
    });
  } catch (error) {
    console.error("Error fetching last records:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
