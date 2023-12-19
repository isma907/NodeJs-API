// auth.ts
import express from "express";
import dotenv from "dotenv";
import { AuthToken } from "../controllers/auth.controller";
const authRouter = express.Router();
dotenv.config();
/**
 * @openapi
 * /auth/token:
 *   post:
 *     summary: GET TOKEN AUTH
 *     description: Retrieve a list of users with optional pagination
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 * */

authRouter.post("/token", AuthToken);

export default authRouter;
