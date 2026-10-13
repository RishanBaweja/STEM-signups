import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import User from "@/database/userSchema";
import Event from "@/database/eventSchema";
import mongoose from "mongoose";

export async function POST(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const body = await request.json().catch(() => null);

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!mongoose.isObjectIdOrHexString(eventId)) {
    return NextResponse.json({ error: "Invalid event ID." }, { status: 400 });
  }

  await connectDB();

  const event = await Event.findById(eventId).select("_id");
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const user = await User.findOne({ email }).select("_id");
  if (!user) {
    return NextResponse.json({ error: "Registration could not be completed." }, { status: 404 });
  }

  const result = await Event.updateOne({ _id: eventId }, { $addToSet: { attendees: user._id } });
  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: "User is already registered for this event." }, { status: 200 });
  }

  return NextResponse.json({ message: "Successfully registered for event!" }, { status: 200 });
}
