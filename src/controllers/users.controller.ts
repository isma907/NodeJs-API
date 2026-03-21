import { Request, Response } from "express";

import { UserSchema } from "../schemas";

export const getUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page ? req.query.page : 1);
    const limit = Number(req.query.limit ? req.query.limit : 10);
    const search = req.query.search ? String(req.query.search) : "";

    const users = await UserSchema.find(
        { name: { $regex: search, $options: "i" } }
    )
        .skip((page - 1) * limit)
        .limit(limit);
    res.send(users);
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const newUser = new UserSchema(req.body);
        await newUser.save();
        return res.status(201).json(newUser);

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        return res.status(500).json({
            message: "Server error",
        });
    }
};