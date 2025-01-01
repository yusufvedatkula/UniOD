import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log("userExists API called");
        
        if (req.headers.get('content-type') !== 'application/json') {
            throw new Error('Content type must be application/json');
        }

        const { email } = await req.json();
        console.log("Checking email:", email);
        
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const user = await User.findOne({ email }).select("_id");
        console.log("User found:", !!user);
        
        return NextResponse.json({
            exists: !!user,
            userId: user ? user._id.toString() : null
        });
    } catch (error) {
        console.error("userExists API error:", error);
        return NextResponse.json(
            { error: "Error checking if user exists" },
            { status: 500 }
        );
    }
}
