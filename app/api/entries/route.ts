import { NextResponse } from "next/server";
import { timeEntrySchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

export async function GET() {
  try {
    const entries = await prisma.timeEntry.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(entries);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch entries";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = timeEntrySchema.parse(body);

    const date = new Date(validatedData.date);
    date.setHours(0, 0, 0, 0);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const existingHours = await prisma.timeEntry.aggregate({
      where: {
        date: {
          gte: date,
          lt: nextDay,
        },
      },
      _sum: { hours: true },
    });

    const currentSum = existingHours._sum.hours || 0;
    const totalHours = currentSum + validatedData.hours;

    if (totalHours > 24) {
      return NextResponse.json(
        {
          error: `Total hours for this date cannot exceed 24. Already logged: ${currentSum}h. You tried to add: ${validatedData.hours}h.`,
        },
        { status: 400 }
      );
    }

    const newEntry = await prisma.timeEntry.create({
      data: validatedData,
    });

    return NextResponse.json(newEntry);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
