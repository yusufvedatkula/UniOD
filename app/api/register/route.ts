import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: Request) {
    try {
        const {name, email, password} = await req.json()
        await connectMongoDB()
        console.log("Connected to MongoDB")

        await User.create({name, email, password, favUnis:[]})
        console.log("User created successfully")

        return NextResponse.json({message:"user registered"}, {status:200})
    } catch (error) {
        console.error("Error occurred:", error)
        return NextResponse.json({message: "Error occurred while registering the user"}, 
            {status: 500}
        )
    }
}