import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDb();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.role === "PENDING")
      return NextResponse.json(
        { error: "You are not a member, please wait for approval" },
        { status: 401 },
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      {
        expiresIn: "7d",
      },
    );

    const userData = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      clubId: user.clubId,
      avatar: user.avatar,
      device: user.device,
      stats: user.stats,
      socials: user.socials,
      bloodGroup: user.bloodGroup,
      dob: user.dob,
      efootballId: user.efootballId,
    };

    return NextResponse.json({ token, user: userData }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
