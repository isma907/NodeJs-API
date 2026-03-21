import express from "express";
import { addUser, getUsers } from "../controllers";


const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get Users
 *     description: Retrieve a list of users with optional pagination
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search term for filtering users
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
router.get("/", getUsers);

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add new User
 *     description: Add a new User to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ismael
 *               lastname:
 *                 type: string
 *                 example: Fernandez
 *               birthdate:
 *                 type: string
 *                 example: 1997-05-10
 *               email:
 *                 type: string
 *                 example: your@email.com
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, check your input
 */
router.post("/add", addUser);

export default router;
