import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse, NextRequest } from "next/server";

//  // Example GET API route
//  @returns {message: string}
// export async function GET() {
//   await connectDB();
//   return NextResponse.json({ message: "Hello from the API!" });
// }

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
