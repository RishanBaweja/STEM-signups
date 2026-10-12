import connectDB from "@/database/db";
import Event from "@/database/eventSchema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Event.find());
}

export async function POST(request: Request) {
  const { hostName, hostLocation, eventDate, eventTime, eventSubject } = await request.json();
  await connectDB();
  const event = await Event.create({
    hostName,
    hostLocation,
    eventDate,
    eventTime,
    eventSubject,
    postDate: new Date(),
    attendees: [],
  });

  return NextResponse.json(event, { status: 201 });
}
