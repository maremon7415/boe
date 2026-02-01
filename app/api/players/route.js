import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "points";
    const role = searchParams.get("role") || "all";

    await connectDb();

    // Determine sort field
    let sortOptions = {};
    if (sortBy === "points")
      sortOptions = { "stats.points": -1, "stats.goalDiff": -1 };
    else if (sortBy === "goals") sortOptions = { "stats.goalsFor": -1 };
    else if (sortBy === "name") sortOptions = { fullName: 1 };
    else sortOptions = { "stats.points": -1 }; // Default

    // Build query
    const query = {
      role: { $in: ["MEMBER", "ADMIN", "CAPTAIN", "ADMINISTRATOR"] },
    };

    if (search) {
      query.fullName = { $regex: search, $options: "i" };
    }

    if (role !== "all") {
      query.role = role;
    }

    // Determine pagination
    const skip = (page - 1) * limit;

    // Fetch players
    const players = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select("fullName avatar clubId stats role position") // Adjust fields as per your schema (position might not exist, checking schema...)
      .lean();

    // NOTE: Schema check - 'position' field does not exist in User model shown earlier, but 'role' does.
    // The previous frontend mock used 'position', so we might need to map 'role' to 'position' or just use 'role'.
    // Or if the user wants 'position' (e.g. Forward, Midfielder), it's not in the schema.
    // For now, I will return 'role' and map it in the frontend if needed, or simply display role.

    const total = await User.countDocuments(query);

    return NextResponse.json({
      players,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
