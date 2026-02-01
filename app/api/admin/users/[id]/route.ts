import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isAdministrator } from "@/lib/auth";
import User from "@/models/User";
import connectDb from "@/lib/db";

// Update User
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectDb();

    // Prevent updating immutable fields if necessary, or just allow full control as requested
    // User requested "full control"

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Admin Update User Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Delete User
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Only Administrator can delete
    if (!(await isAdministrator(request))) {
      return NextResponse.json(
        { error: "Unauthorized. Only Administrator can delete users." },
        { status: 403 },
      );
    }

    const { id } = await params;

    await connectDb();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin Delete User Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
