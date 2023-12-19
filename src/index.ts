import express from "express";
import usersRoute from "./routes/users";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json";
import { connectDB } from "./database";
import { authenticateJWT } from "./middleware/auth";
import authRouter from "./routes/auth";

const PORT = 3000;
const app = express();
app.use(express.json());
const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use("/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", authenticateJWT, usersRoute);

async function main() {
  try {
    app.listen(PORT);
    await connectDB();
    console.log(`Server Running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

main();
