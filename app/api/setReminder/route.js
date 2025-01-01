import { getServerSession } from "next-auth/next";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { authOptions } from "@/util/authOptions";
import { NextResponse } from "next/server"

import { convertEmail } from "@/Email/email";
import { scheduleEmail } from "@/Email/scheduleEmail";

import { combineUniData } from "@/util/combineUniData";

export async function POST(req) {
    const session = await getServerSession(authOptions)
    const uniData = await combineUniData()

   
    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        await connectMongoDB()
        const user = await User.findOne({email: session.user.email})
        const {university, openDayDate, time} = await req.json()
        const foundUniversity = uniData.find(uni => uni.uniName === university);

        const mailOptions = await convertEmail(openDayDate, university, user.email, foundUniversity, session?.user?.name)

        scheduleEmail([openDayDate], mailOptions, time)

        return NextResponse.json({message:"university and open day date recieved and email scheduled"}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error occured"},{status:500})
    }
}