import mongoose from "mongoose";

export async function dbConnect() {
    const dbURI = process.env.DATABASE_HOST || "mongodb://127.0.0.1:27017";
    const dbName = process.env.DATABASE_NAME || "characters";
    const dbUser = process.env.DATABASE_USER || "";
    const dbPassword = process.env.DATABASE_PASSWORD || "";

    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbURI, { dbName, user: dbUser, pass: dbPassword });
    console.log(`Connected to database: ${dbName}`);
}