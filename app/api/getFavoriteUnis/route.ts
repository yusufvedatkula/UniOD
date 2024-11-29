import { getServerSession } from "next-auth/next";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    // Get the user's session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Find the user in the database
        const user = await User.findOne({ email: session.user.email });

        if (!user || !user.favUnis) {
            return NextResponse.json({ message: "No favorite universities found" }, { status: 404 });
        }
        console.log(user.favUnis)

        // Return the list of favorite universities
        return NextResponse.json({ favorites: user.favUnis }, { status: 200 });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
