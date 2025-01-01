import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { validatePassword } from "@/constants";

export async function POST(req: Request) {
  try {
    // Get session and connect to the database
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { newName, newPassword, oldPassword } = await req.json();
    await connectMongoDB();

    // Fetch user from the database
    const user = await User.findOne({ email: session?.user?.email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update name only
    if (!oldPassword && !newPassword && newName) {
      await User.updateOne({ email: session?.user?.email }, { $set: { name: newName } });
      return NextResponse.json({ message: "User name updated successfully" }, { status: 200 });
    }

    // Old password is empty, but new password is provided
    if (!oldPassword && newPassword) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // New password is empty
    if (!newPassword) {
      return NextResponse.json(
        { message: "New password cannot be empty" },
        { status: 400 }
      );
    }

    if (!validatePassword(newPassword)) {
      return NextResponse.json(
        { message: "New Password is too weak. Please use a stronger password." },
        { status: 400 }
      );
    }

    // Check if old password matches and update both password and name
    if (oldPassword === user.password) {
      const updateFields: { name?: string; password?: string } = {};
      if (newName) updateFields.name = newName;
      updateFields.password = newPassword;

      await User.updateOne({ email: session?.user?.email }, { $set: updateFields });
      return NextResponse.json(
        { message: "User account updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Error occurred while updating the user account" },
      { status: 500 }
    );
  }
}
