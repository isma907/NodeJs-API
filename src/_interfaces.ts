export interface IUser {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  birthday: Date;
  dni: string;
  username: string;
  password: string;
  created_date?: Date;
  updated_date?: Date;
}
