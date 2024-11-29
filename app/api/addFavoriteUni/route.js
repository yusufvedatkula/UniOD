import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { combineUniData } from "@/util/combineUniData";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    // Retrieve session data on the server-side using getSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    } else {
        console.log('session exists')
    }

    // Get university data from request
    const { university } = await req.json();

    // Validate university input
    if (!university) {
        return NextResponse.json({ message: 'University name is required' }, { status: 400 });
    }

    const uniData = await combineUniData();

    // Find university in the data
    const foundUniversity = uniData.find(uni => uni.uniName === university);
    if (!foundUniversity) {
        return NextResponse.json({ message: 'University not found' }, { status: 404 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Find the user in the database based on the session's email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Add the university to the user's favorites
    user.favUnis.push(foundUniversity);
    try {
        await user.save();
    } catch (err) {
        const errorMessage = (err).message;
        return NextResponse.json({ message: 'Error saving user data', error: errorMessage }, { status: 500 });
    }

    return NextResponse.json({ message: 'University added to favorites' }, { status: 200 });
}
