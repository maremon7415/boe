import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDb();

    // Fetch top 20 players based on points (desc) and goal difference (desc)
    const players = await User.find({
      role: { $in: ["MEMBER", "ADMIN", "CAPTAIN", "ADMINISTRATOR"] },
    })
      .sort({ "stats.points": -1, "stats.goalDiff": -1 })
      .limit(20)
      .select("fullName avatar clubId stats role"); // Select only necessary fields

    return NextResponse.json({ players });
  } catch (error) {
    console.error("Error fetching top players:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
