import mongoose from "mongoose";
import { SuperheroCharacter } from "../_interfaces";

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

const SuperheroCharacter = mongoose.model<SuperheroCharacter>(
  "superheroes",
  superheroesCharacterSchema
);
export default SuperheroCharacter;
