import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: Request) {
    try {
        // Check Content-Type
        if (req.headers.get('content-type') !== 'application/json') {
            return NextResponse.json(
                { error: "Invalid content type" },
                { status: 400 }
            );
        }

        // Parse request body
        const { name, email, password } = await req.json();

        // Connect to MongoDB
        await connectMongoDB();
        console.error("Connected to MongoDB");

        // Create user
        await User.create({ name, email, password, favUnis: [] });
        console.error("User created successfully");

        return NextResponse.json(
            { message: "User registered" },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error occurred:", error);

        return NextResponse.json(
            {
                message: "Error occurred while registering the user",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
