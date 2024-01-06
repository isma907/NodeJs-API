import express from "express";
import {
  filterUserByObj,
  getCharacters,
} from "../controllers/simpsons.controller";

const router = express.Router();

/**
 * @openapi
 * /simpsons/characters:
 *   get:
 *     summary: Get Simpsons Characters
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
router.get("/characters", getCharacters);

/**
 * @swagger
 * /simpsons/filterByObj:
 *   post:
 *     summary: Filter User By
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *              name:string
 *     responses:
 *       201:
 *         description: Example created successfully
 *       400:
 *         description: Bad request, check your input
 */
router.post("/filterByObj", filterUserByObj);

export default router;
