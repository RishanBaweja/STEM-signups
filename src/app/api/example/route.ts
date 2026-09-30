import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import User from "@/database/userSchema";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { firstName, lastName, username, email, password, role, educatorInfo } = await request.json();

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      educatorInfo: role === "educator" ? educatorInfo : undefined,
    });

    await newUser.save();
    return NextResponse.json({ message: "User Creation Successful" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failure to Create New User" }, { status: 500 });
  }
}
