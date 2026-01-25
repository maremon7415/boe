import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import connectDb from "@/lib/db";
import User from "@/models/User";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  efootballId: z.string().optional().default(""),

  device: z.object({
    name: z.string().min(1, "Device name is required"),
    model: z.string().min(1, "Device model is required"),
  }),

  avatar: z.string().optional().default(""),

  socialAccounts: z
    .object({
      facebook: z.string().optional().default(""),
      twitter: z.string().optional().default(""),
      youtube: z.string().optional().default(""),
      discord: z.string().optional().default(""),
    })
    .optional()
    .default({
      facebook: "",
      twitter: "",
      youtube: "",
      discord: "",
    }),

  dob: z.coerce.date(),
  bloodGroup: z.string().optional().default(""),
});

export async function POST(request) {
  try {
    await connectDb();

    const body = await request.json();
    const parsed = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    const newUser = await User.create({
      fullName: parsed.fullName,
      email: parsed.email,
      password: passwordHash,
      role: "PENDING", 
      efootballId: parsed.efootballId,
      device: parsed.device,
      avatar: parsed.avatar,
      socialAccounts: parsed.socialAccounts,
      dob: parsed.dob,
      bloodGroup: parsed.bloodGroup,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          efootballId: newUser.efootballId,
          device: newUser.device,
          socialAccounts: newUser.socialAccounts,
          dob: newUser.dob,
          bloodGroup: newUser.bloodGroup,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    console.log("REGISTER_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
