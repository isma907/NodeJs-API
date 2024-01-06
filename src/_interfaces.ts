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

export interface SimpsonCharacter {
  _id?: string;
  name: string;
  resume: string;
  image: string;
  gender: string;
  status: string;
  occupation: string;
}
