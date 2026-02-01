import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connectDb();

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret",
      );

      const user = await User.findById(decoded.userId).select("-password -__v");

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Return user data in the same format as login
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

      return NextResponse.json({ user: userData }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
