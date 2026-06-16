import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const monthParam = parseInt(searchParams.get("month")); // e.g. 10 for October

    // Validate month (1–12)
    if (!monthParam || monthParam < 1 || monthParam > 12) {
      return NextResponse.json(
        { error: "Paramètre 'month' invalide (doit être entre 1 et 12)" },
        { status: 400 }
      );
    }

    const now = new Date();
    const year = now.getFullYear();

    // Get start and end of given month
    const startOfMonth = new Date(year, monthParam - 1, 1);
    const endOfMonth = new Date(year, monthParam, 1); // next month start

    // Query all three counts in parallel
    const [newPatients, ordonnances, consultations] = await Promise.all([
      prisma.patient.count({
        where: { createdAt: { gte: startOfMonth, lt: endOfMonth } },
      }),
      prisma.ordonnance.count({
        where: { createdAt: { gte: startOfMonth, lt: endOfMonth } },
      }),
      prisma.consultation.count({
        where: { createdAt: { gte: startOfMonth, lt: endOfMonth } },
      }),
    ]);

    return NextResponse.json({
      month: monthParam,
      year,
      newPatients,
      ordonnances,
      consultations,
    });
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

