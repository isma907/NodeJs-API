import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json";
import simpsonsRoute from "./routes/simpsons";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/simpsons", simpsonsRoute);

async function main() {
  try {
    const dbURI = process.env.DATABASE_HOST || "mongodb://127.0.0.1:27017";
    const dbName = process.env.DATABASE_NAME || "simpsons";

    await mongoose.connect(dbURI, { dbName });
    console.log(`Connected to MongoDB database: ${dbName}`);

    app.listen(PORT, () => {
      console.log(`API Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();
