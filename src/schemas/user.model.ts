import mongoose from "mongoose";
import { IUser } from "../_interfaces";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dni: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  update_date: {
    type: Date,
  },
  created_date: {
    type: Date,
  },
});

const User = mongoose.model<IUser>("users", userSchema);
export default User;
