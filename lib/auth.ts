import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDb from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export async function isAuthenticated(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connectDb();
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
}

export async function isAdmin(request: NextRequest) {
  const user = await isAuthenticated(request);
  if (!user) return false;
  return user.role === "ADMINISTRATOR" || user.role === "ADMIN";
}

export async function isAdministrator(request: NextRequest) {
  const user = await isAuthenticated(request);
  if (!user) return false;
  return user.role === "ADMINISTRATOR";
}
