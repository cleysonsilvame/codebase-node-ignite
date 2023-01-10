import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";
import rateLimiter from "./middlewares/rateLimiter";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    if (event.request.data) {
      try {
        const data = JSON.parse(event.request.data);

        if (data.password) {
          data.password = "*";
          // eslint-disable-next-line no-param-reassign
          event.request.data = data;
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return event;
  },
});

app.use(rateLimiter);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

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

export { app };
