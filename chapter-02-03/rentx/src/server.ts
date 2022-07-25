import express from "express";
import swaggerUi from "swagger-ui-express";

import { createConnection } from "./database";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";

import "./shared/container";

createConnection()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => {
  console.log("🚀 ~ app.listen ~", 3333);
});
