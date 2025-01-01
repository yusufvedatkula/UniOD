import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Validate content type
        if (req.headers.get('content-type') !== 'application/json') {
            return NextResponse.json(
                { error: "Invalid content type" },
                { status: 400 }
            );
        }

        // Parse request body
        const { email } = await req.json();

        // Validate email
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectMongoDB();
        console.error("Connected to MongoDB");

        // Find user
        const user = await User.findOne({ email }).select("_id");
        console.error("User lookup result:", user);

        // Return response
        return NextResponse.json({
            exists: !!user,
            userId: user?._id || null,
        });
    } catch (error) {
        console.error("Error occurred:", error);

        return NextResponse.json(
            { error: "Failed to check if user exists" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
