import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        // Get session and connect to the database
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { oldPassword } = await req.json();

        await connectMongoDB();
        const user = await User.findOne({ email: session?.user?.email }).select("+password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (oldPassword == user.password) {
            await User.findOneAndDelete({ email: session?.user?.email })
            return NextResponse.json(
                { message: "User account deleted successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Entered Password does not match, account cannot be deleted" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error occurred while deleting the user account" },
            { status: 500 }
        );
    }
}