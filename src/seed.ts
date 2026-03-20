import dotenv from "dotenv";
import mongoose from "mongoose";
import SimpsonCharacterSchema from "./schemas/simpson.character";
import path from "path";
import fs from "fs";

dotenv.config();

async function seed() {
  try {
    const dbURI = process.env.DATABASE_HOST || "mongodb://127.0.0.1:27017";
    const dbName = process.env.DATABASE_NAME || "simpsons";
    
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbURI, { dbName });
    console.log(`Connected to database: ${dbName}`);

    console.log("Reading simpsons.characters.json...");
    const dataPath = path.resolve(__dirname, "../simpsons.characters.json");
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at ${dataPath}`);
    }
    
    const jsonData = require(dataPath);
    
    console.log("Clearing collection...");
    await SimpsonCharacterSchema.deleteMany({});
    
    console.log(`Inserting documents into MongoDB...`);
    await SimpsonCharacterSchema.insertMany(jsonData);
    
    console.log("Seeding complete! Successfully generated database seed.");
  } catch (err) {
    console.error("Error generating seed:", err);
  } finally {
    console.log("Disconnecting from MongoDB...");
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
