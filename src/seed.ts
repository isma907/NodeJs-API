import dotenv from "dotenv";
import mongoose from "mongoose";
import SimpsonCharacterSchema from "./schemas/simpson.characters";
import path from "path";
import fs from "fs";
import SuperheroCharacter from "./schemas/superheroes.characters";

dotenv.config();

async function seed() {
  try {
    const dbURI = process.env.DATABASE_HOST || "mongodb://127.0.0.1:27017";
    const dbName = process.env.DATABASE_NAME || "characters";

    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbURI, { dbName });
    console.log(`Connected to database: ${dbName}`);

    console.log("Reading simpsons.characters.json...");
    console.log("Reading superheroes.characters.json...");

    const dataPathSimpsons = path.resolve(__dirname, "../data/simpsons.json");
    const dataPathHeroes = path.resolve(__dirname, "../data/superheroes.json");
    if (!fs.existsSync(dataPathSimpsons)) {
      throw new Error(`Data file not found at ${dataPathSimpsons}`);
    }
    if (!fs.existsSync(dataPathHeroes)) {
      throw new Error(`Data file not found at ${dataPathHeroes}`);
    }

    const jsonDataSimpsons = require(dataPathSimpsons);
    const jsonDataHeroes = require(dataPathHeroes);

    console.log("Clearing collection...");
    await SimpsonCharacterSchema.deleteMany({});
    await SuperheroCharacter.deleteMany({});

    console.log(`Inserting documents into MongoDB...`);
    await SimpsonCharacterSchema.insertMany(jsonDataSimpsons);
    await SuperheroCharacter.insertMany(jsonDataHeroes);

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
