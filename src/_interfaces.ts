import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  birthday: Date;
  dni: string;
  username: string;
  password: string;
}
