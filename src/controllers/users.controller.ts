import bcrypt from "bcrypt";
import { IUser } from "../_interfaces";
import { Request, Response } from "express";
import User from "../schemas/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page ? req.query.page : 1);
  const limit = Number(req.query.limit ? req.query.limit : 10);

  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(users);
};

export const addUser = async (req: Request<{}, any, IUser>, res: Response) => {
  const user: IUser = req.body;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const created_user = await User.create({
      name: user.name,
      lastname: user.lastname,
      birthday: new Date(user.birthday),
      dni: user.dni,
      email: user.email,
      password: hashedPassword,
      username: user.username,
    });

    res.status(201).json(created_user);
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue);
      console.error(
        `Error adding user: Duplicate key error on field "${duplicatedField}"`
      );
      res
        .status(400)
        .json({ error: `${duplicatedField.join(",")} is already in use` });
    } else {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const filterUserByObj = async (
  req: Request<{}, any, IUser>,
  res: Response
) => {
  const filterObj = req.body;
  const page = Number(req.query.page ? req.query.page : 1);
  const limit = Number(req.query.limit ? req.query.limit : 10);
  //@ts-ignore
  const users = await User.find(filterObj)
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(users);
};

export const updateUser = async (
  req: Request<{}, any, IUser>,
  res: Response
) => {
  const user: IUser = req.body;
  try {
    const updated_user = await User.findByIdAndUpdate(user._id, {
      $set: {
        name: user.name,
        lastname: user.lastname,
        birthday: new Date(user.birthday),
        dni: user.dni,
        email: user.email,
      },
    });

    res.status(201).json(updated_user);
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue);
      console.error(
        `Error adding user: Duplicate key error on field "${duplicatedField}"`
      );
      res
        .status(400)
        .json({ error: `${duplicatedField.join(",")} is already in use` });
    } else {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const deleteUser = async (
  req: Request<{}, any, IUser>,
  res: Response
) => {
  const user: IUser = req.body;
  try {
    await User.deleteOne({ _id: user._id });
    res.send("User successfully deleted");
  } catch (err) {}
};
