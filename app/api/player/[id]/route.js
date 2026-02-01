import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/User";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Player ID" }, { status: 400 });
    }

    await connectDb();

    // Fetch player details
    const player = await User.findById(id).select("-password").lean();

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json({ player });
  } catch (error) {
    console.error("Error fetching player details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
