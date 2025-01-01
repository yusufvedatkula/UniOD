import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB() {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("❌ MONGODB_URI is not defined in environment variables");
        }

        console.log("🔄 Connecting to MongoDB...");
        
        // Add connection options and timeout
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });

        isConnected = true;
        console.log("✅ MongoDB connected successfully");
    } catch (error: unknown) {
        isConnected = false;
        console.error("❌ MongoDB connection error:", {
            message: error instanceof Error ? error.message : "Unknown error",
            code: error instanceof Error ? (error as { code?: number }).code : undefined,
            name: error instanceof Error ? error.name : "Unknown"
        });
        throw error;
    }
}
