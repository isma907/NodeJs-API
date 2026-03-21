

import { Request, Response } from "express";
import { SuperHeroCharacterSchema } from "../schemas";
import { DataPageResponse, SuperheroCharacter } from "../interfaces";

export const getSuperHeroes = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const query = req.query.query ?? ''

  const filter = query
    ? { name: { $regex: query, $options: "i" } }
    : {};

  const [users, total] = await Promise.all([
    SuperHeroCharacterSchema.find(filter)
      .skip((page - 1) * limit)
      .limit(limit),
    SuperHeroCharacterSchema.countDocuments(filter),
  ]);

  const resData: DataPageResponse<SuperheroCharacter> = {
    data: users,
    page,
    limit,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
  };

  res.json(resData);
};
