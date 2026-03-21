import express from "express";
import { getSuperHeroes } from "../controllers";


const router = express.Router();

/**
 * @openapi
 * /superheroes/characters:
 *   get:
 *     summary: Get Superheroes Characters
 *     description: Retrieve a list of users with optional pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page for pagination
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *       400:
 *         description: Bad request, check your input
 */
router.get("/characters", getSuperHeroes);

export default router;
