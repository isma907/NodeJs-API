import mongoose from "mongoose";
import { SimpsonCharacter } from "../interfaces"

const simpsonCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  resume: {
    type: String,
  },
  image: {
    type: String,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
  occupation: {
    type: String,
  },
});

export const SimpsonCharacterSchema = mongoose.model<SimpsonCharacter>(
  "simpsons",
  simpsonCharacterSchema
);
