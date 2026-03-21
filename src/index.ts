import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json";

import simpsonsRoute from "./routes/simpsons";
import superheroesRoute from "./routes/superheroes";
import usersRoute from "./routes/users";

import dotenv from "dotenv";
import { dbConnect } from "./database";

dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/simpsons", simpsonsRoute);
app.use("/superheroes", superheroesRoute);
app.use("/users", usersRoute);

async function main() {
  try {
    dbConnect()
    app.listen(PORT, () => {
      console.log(`API Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();
