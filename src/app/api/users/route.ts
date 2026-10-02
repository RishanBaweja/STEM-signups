import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse, NextRequest } from "next/server";

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

//DELETE api based on userName
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const name: string | null = searchParams.get("userName");
    if (!name) {
      return NextResponse.json(
        { message: `Error: userName not found` },
        {
          status: 400,
        },
      );
    }
    await User.deleteOne({ userName: name });
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
    const name: string | null = searchParams.get("userName");
    if (!name) {
      return NextResponse.json(
        { message: `Error: userName not found` },
        {
          status: 400,
        },
      );
    }
    const firstName: string | null = searchParams.get("firstName");
    const lastName: string | null = searchParams.get("lastName");
    const email: string | null = searchParams.get("email");
    const password: string | null = searchParams.get("password"); //needs to be secured
    await User.updateOne(
      { userName: name },
      { $set: { email: email, password: password, firstName: firstName, lastName: lastName } },
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
