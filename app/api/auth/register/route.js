import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import connectDb from "@/lib/db"; // Ensure this matches your file structure
import User from "@/models/User";
import Counter from "@/models/Counter"; // Don't forget to import this!

// ---------------------------------------------------------
// 1. UPDATED ZOD SCHEMA (Matches your Frontend + Mongoose)
// ---------------------------------------------------------
const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  efootballId: z.string().optional().default(""),

  device: z.object({
    name: z.string().min(1, "Device name is required"),
    model: z.string().min(1, "Device model is required"),
  }),

  // Social Accounts: Facebook is now REQUIRED based on your form
  socialAccounts: z.object({
    facebook: z.string().min(5, "Facebook profile is required"),
    twitter: z.string().optional().default(""),
    youtube: z.string().optional().default(""),
    discord: z.string().optional().default(""),
  }),

  dob: z.coerce.date(),
  bloodGroup: z.string().optional().default(""),
});

export async function POST(request) {
  try {
    // 1. Connect to DB
    await connectDb();

    // 2. Parse & Validate Body
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    // 3. Check for Existing User
    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 4. GENERATE CLUB ID (Atomic Increment)
    // This finds the 'clubId' counter and adds 1 to it.
    // If it doesn't exist, it creates it starting at 1.
    const counter = await Counter.findOneAndUpdate(
      { name: "clubId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counter) {
      throw new Error("Failed to generate Club ID");
    }

    // Format ID: 1 -> "BOE-0001"
    const formattedClubId = `BOE-${counter.seq.toString().padStart(4, "0")}`;

    // 5. Hash Password
    const passwordHash = await bcrypt.hash(parsed.password, 10);

    // 6. Create User
    const newUser = await User.create({
      clubId: formattedClubId, // <--- The generated ID
      fullName: parsed.fullName,
      email: parsed.email,
      password: passwordHash,
      role: "PENDING",
      efootballId: parsed.efootballId,
      dob: parsed.dob,
      bloodGroup: parsed.bloodGroup,
      
      // Nested Objects
      device: parsed.device,
      socialAccounts: parsed.socialAccounts,
      
      // Initialize Stats (Required by your schema)
      stats: {
        totalMatch: 0,
        win: 0,
        draw: 0,
        loss: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
        form: []
      }
    });

    // 7. Success Response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          clubId: newUser.clubId, // Send this back so user sees their new ID!
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    // Handle Validation Errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    // Handle Server Errors
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}