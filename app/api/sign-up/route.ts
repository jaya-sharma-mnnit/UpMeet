import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/helper/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, username, password } = body;

    // Simple validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
         // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("invalid email format");
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password format validation
    // Must be at least 8 characters, include 1 number, 1 uppercase letter, and 1 special character
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|\\:;"'<>,./?])[A-Za-z\d@$!%*?&#^()\-_=+{}[\]|\\:;"'<>,./?]{8,}$/;
    if (!passwordRegex.test(password)) {
      // console.log("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character");
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character"
        },
        { status: 400 }
      );
      
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
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

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      },
    });

    // Set token as HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("❌ Sign-up error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}