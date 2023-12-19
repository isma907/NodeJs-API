import swaggerAutogen from "swagger-autogen";
import * as swaggerOption from "../swagger.json";

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/users.ts"];

swaggerAutogen()(outputFile, routes, swaggerOption);
