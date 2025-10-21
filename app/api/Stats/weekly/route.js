import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Helper: French day names (Mon → Sun)
const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Create array for the last 7 days (including today)
    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // oldest first
      return date;
    });

    // Query counts for each day
    const dailyCounts = await Promise.all(
      days.map(async (date) => {
        const start = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const end = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        );

        const count = await prisma.patient.count({
          where: { createdAt: { gte: start, lt: end } },
        });

        // Convert JS day (0=Sun) to French weekday name
        const weekDay = dayNames[date.getDay()];

        return { week: weekDay, patients: count };
      })
    );

    return NextResponse.json(dailyCounts);
  } catch (error) {
    console.error("Error fetching weekly patients:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
