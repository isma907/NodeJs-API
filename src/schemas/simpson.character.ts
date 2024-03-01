import mongoose from "mongoose";
import { SimpsonCharacter as SimpsonCharacterSchema } from "../_interfaces";

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

const SimpsonCharacterSchema = mongoose.model<SimpsonCharacterSchema>(
  "characters",
  simpsonCharacterSchema
);
export default SimpsonCharacterSchema;
