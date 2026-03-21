import { Request, Response } from "express";
import { SimpsonCharacter } from "../interfaces";
import { UserSchema } from "../schemas";


export const getUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page ? req.query.page : 1);
    const limit = Number(req.query.limit ? req.query.limit : 10);

    const users = await UserSchema.find()
        .skip((page - 1) * limit)
        .limit(limit);
    res.send(users);
};

export const addUser = async (req: Request<{}, any, SimpsonCharacter>, res: Response) => {
    const newUser = new UserSchema(req.body);
    await newUser.save();
    res.status(201).send(newUser);
}
