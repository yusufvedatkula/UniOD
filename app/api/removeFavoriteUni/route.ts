import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get the session to verify if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the university to remove from the request
    const { uniToRemove } = await req.json();
    console.log("University to remove:", uniToRemove);

    // Find the user by their email and update the favUnis array
    const user = await User.findOneAndUpdate(
      { email: session?.user?.email },  // Find the user by email
      {
        $pull: { 
          favUnis: { uniName: uniToRemove }  // Remove the object where uniName matches
        }
      },
      { new: true }  // Return the updated document
    ).select("+favUnis");  // Ensure favUnis is included in the result

    // Check if the user and the update were successful
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return a success message
    console.log('universitt removed');
    return NextResponse.json({ message: "University removed" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occurred while deleting the university from favorites" },
      { status: 500 }
    );
  }
}
