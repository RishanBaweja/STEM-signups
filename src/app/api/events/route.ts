import connectDB from "@/database/db";
import Event from "@/database/eventSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find();

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { hostName, hostLocation, postDate, eventDate, eventTime, eventSubject, attendees } = await request.json();
    const newEvent = new Event({
      hostName,
      hostLocation,
      postDate,
      eventDate,
      eventTime,
      eventSubject,
      attendees,
    });

    await newEvent.save();
    return NextResponse.json({ message: "Event Creation Successful" }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failure to Create New Event" }, { status: 500 });
  }
}

//DELETE api based on userName
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const id: string | null = searchParams.get("eventId");
    if (!id) {
      return NextResponse.json(
        { message: `Error: eventId not found` },
        {
          status: 404,
        },
      );
    }
    await Event.deleteOne({ eventID: id });
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { message: `Error: ${e}` },
      {
        status: 400,
      },
    );
  }
}

//PATCH api based on username
//updates email, password, lastName, and firstName with every call
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const id: string | null = searchParams.get("eventId");
    if (!id) {
      return NextResponse.json(
        { message: `Error: eventId not found` },
        {
          status: 404,
        },
      );
    }
    const eventHost: string | null = searchParams.get("eventHost");
    const eventLocation: string | null = searchParams.get("eventLocatiom");
    const eventDate: string | null = searchParams.get("eventDate");
    const eventTime: string | null = searchParams.get("eventTime");
    const attendees: string | null = searchParams.get("attendees");
    await Event.updateOne(
      { eventId: id },
      {
        $set: {
          eventHost: eventHost,
          eventLocation: eventLocation,
          eventDate: eventDate,
          eventTime: eventTime,
          attendees: attendees,
        },
      },
    );
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { message: `Error: ${e}` },
      {
        status: 400,
      },
    );
  }
}
