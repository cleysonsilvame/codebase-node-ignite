import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

// eslint-disable-next-line import-helpers/order-imports
import { createConnection } from "@shared/infra/typeorm";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";

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

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log("🚀 ~ app.listen ~", 3333);
});
