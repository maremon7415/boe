import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import User from "@/models/User";
import connectDb from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    
    let query: any = {};

    if (role) {
      if (role === 'player') {
         query.role = { $in: ['MEMBER', 'CAPTAIN'] };
      } else {
         query.role = role.toUpperCase();
      }
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Admin Users Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
