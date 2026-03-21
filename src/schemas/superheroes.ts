import mongoose from "mongoose";
import { SuperheroCharacter } from "../interfaces";

const superheroesCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  firstAppearance: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  publisher: {
    type: String,
  },
});

export const SuperHeroCharacterSchema = mongoose.model<SuperheroCharacter>(
  "superheroes",
  superheroesCharacterSchema
);
