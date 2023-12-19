import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.DATABASE_HOST, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};
