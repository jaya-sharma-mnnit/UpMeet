import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/helper/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, username, password } = body;

    // Simple validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "⚠️ User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "✅ User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Sign-in error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}