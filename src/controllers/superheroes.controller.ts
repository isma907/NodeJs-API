import { DataPageResponse, SimpsonCharacter, SuperheroCharacter } from "../_interfaces";
import { Request, Response } from "express";
import SuperheroCharacterSchema from "../schemas/superheroes.characters";

export const getSuperHeroes = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const query = req.query.query ?? ''

  const filter = query
    ? { name: { $regex: query, $options: "i" } }
    : {};

  const [users, total] = await Promise.all([
    SuperheroCharacterSchema.find(filter)
      .skip((page - 1) * limit)
      .limit(limit),
    SuperheroCharacterSchema.countDocuments(filter),
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


export const filterUserByObj = async (
  req: Request<{}, any, SimpsonCharacter>,
  res: Response
) => {
  const filterObj = req.body;
  const page = Number(req.query.page ? req.query.page : 1);
  const limit = Number(req.query.limit ? req.query.limit : 10);

  const regexFilterObj: Partial<Record<keyof SimpsonCharacter, RegExp>> = {};

  for (const key in filterObj) {
    if (Object.prototype.hasOwnProperty.call(filterObj, key)) {
      const typedKey = key as keyof SimpsonCharacter;
      const value = filterObj[typedKey];

      if (value) {
        regexFilterObj[typedKey] = new RegExp(String(value), "i");
      }
    }
  }
  const users = await SuperheroCharacterSchema.find(regexFilterObj)
    .skip((page - 1) * limit)
    .limit(limit);

  res.send(users);
};
