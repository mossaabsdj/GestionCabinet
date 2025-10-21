import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ French weekday names (0=Dim, 1=Lun, etc.)
const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Create array of the last 7 days (Mon → Sun style)
    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // oldest first
      return date;
    });

    // Query consultations count for each day
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

        const count = await prisma.consultation.count({
          where: { createdAt: { gte: start, lt: end } },
        });

        return {
          week: dayNames[date.getDay()],
          consultations: count,
        };
      })
    );

    return NextResponse.json(dailyCounts);
  } catch (error) {
    console.error("Error fetching weekly consultations:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
