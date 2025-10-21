import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const daysParam = parseInt(searchParams.get("days")) || 7; // default: last 7 days

    // --- Calculate the date range
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - daysParam);

    // --- Fetch consultations from the last N days
    const consultations = await prisma.consultation.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: now,
        },
      },
      select: { createdAt: true },
    });

    if (consultations.length === 0) {
      return NextResponse.json({
        daysAnalyzed: daysParam,
        totalConsultations: 0,
        hourlyAverage: [],
      });
    }

    // --- Count consultations per hour
    const hourlyCounts = Array(24).fill(0);
    consultations.forEach((c) => {
      const hour = new Date(c.createdAt).getHours();
      hourlyCounts[hour]++;
    });

    // --- Compute average per hour (over N days)
    const hourlyAverage = hourlyCounts.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      average: Number((count / daysParam).toFixed(2)),
      total: count,
    }));

    // --- Return structured data
    return NextResponse.json({
      daysAnalyzed: daysParam,
      totalConsultations: consultations.length,
      hourlyAverage,
    });
  } catch (error) {
    console.error("Error fetching hourly averages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
