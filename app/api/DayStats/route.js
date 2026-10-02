export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    // Local start and end of day
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const [newPatients, ordonnances, bilans, consultations] = await Promise.all(
      [
        prisma.patient.count({
          where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        }),
        prisma.ordonnance.count({
          where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        }),
        prisma.bilanRecip.count({
          where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        }),
        prisma.consultation.count({
          where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        }),
      ]
    );

    // ✅ Use local date, not UTC
    const localDate = now.toLocaleDateString("fr-FR"); // or "en-GB", depending on your region

    return NextResponse.json({
      date: localDate,
      newPatients,
      ordonnances,
      bilans,
      consultations,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

