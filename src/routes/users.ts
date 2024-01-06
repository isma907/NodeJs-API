import express from "express";
import {
  deleteUser,
  filterUserByObj,
  getUsers,
  updateUser,
  addUser,
} from "../controllers/users.controller";

const router = express.Router();

/**
 * @openapi
 * /users/:
 *   get:
 *     summary: Get Users
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
router.get("/", getUsers);

/**
 * @openapi
 * /users/filterByObj:
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/filterByObj", filterUserByObj);

/**
 * @openapi
 * /users/add:
 *   post:
 *     summary: Create a new example
 *     description: Endpoint to create a new example using POST
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
router.post("/add", addUser);

/**
 * @openapi
 * /users/update:
 *   put:
 *     summary: Update Current User Data
 *     description: Endpoint to create a new example using POST
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
router.put("/update", updateUser);

/**
 * @openapi
 * /users/delete:
 *   delete:
 *     summary: Delete User
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
 * */
router.delete("/delete", deleteUser);

export default router;
