import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized - Missing Token" });
    return;
  }

  //@ts-ignore
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Forbidden - Invalid Token" });
      return;
    }
    //@ts-ignore
    req.user = user;
    next();
  });
};
