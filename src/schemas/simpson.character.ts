import mongoose from "mongoose";
import { SimpsonCharacter as SimpsonCharacterSchema } from "../_interfaces";

const simpsonCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const SimpsonCharacterSchema = mongoose.model<SimpsonCharacterSchema>(
  "simpsons",
  simpsonCharacterSchema
);
export default SimpsonCharacterSchema;
