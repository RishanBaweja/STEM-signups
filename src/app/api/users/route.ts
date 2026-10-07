import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select("-password");

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

    if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Username, email, and password are required." }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedUsername || !normalizedEmail || !password) {
      return NextResponse.json({ error: "Username, email, and password cannot be empty." }, { status: 400 });
    }

    const usernameTaken = await User.exists({ username: normalizedUsername });
    const emailTaken = await User.exists({ email: normalizedEmail });

    if (usernameTaken) {
      return NextResponse.json({ error: "Username already exists.", field: "username" }, { status: 409 });
    }

    if (emailTaken) {
      return NextResponse.json({ error: "Email already exists.", field: "email" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      educatorInfo: role === "educator" ? educatorInfo : undefined,
    });

    await newUser.save();
    return NextResponse.json({ message: "User Creation Successful" }, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "Username or email already exists." }, { status: 409 });
    }

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
    const password: string | null = searchParams.get("password");
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
