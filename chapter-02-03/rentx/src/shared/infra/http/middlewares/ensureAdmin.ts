import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError("You must be an admin.", 401);
  }

  return next();
}
