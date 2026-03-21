import { SimpsonCharacter } from "../_interfaces";
import { Request, Response } from "express";
import SimpsonCharacterSchema from "../schemas/simpson.characters";

export const getCharacters = async (req: Request, res: Response) => {
  const page = Number(req.query.page ? req.query.page : 1);
  const limit = Number(req.query.limit ? req.query.limit : 10);

  const users = await SimpsonCharacterSchema.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(users);
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
  const users = await SimpsonCharacterSchema.find(regexFilterObj)
    .skip((page - 1) * limit)
    .limit(limit);

  res.send(users);
};
