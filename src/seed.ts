import dotenv from "dotenv";
import mongoose from "mongoose";
import SimpsonCharacterSchema from "./schemas/simpson";
import path from "path";
import fs from "fs";
import SuperHeroCharacterSchema from "./schemas/superheroes";
import { dbConnect } from "./database";

dotenv.config();

async function seed() {
  try {

    dbConnect()
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
    await SuperHeroCharacterSchema.deleteMany({});

    console.log(`Inserting documents into MongoDB...`);
    await SimpsonCharacterSchema.insertMany(jsonDataSimpsons);
    await SuperHeroCharacterSchema.insertMany(jsonDataHeroes);

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
