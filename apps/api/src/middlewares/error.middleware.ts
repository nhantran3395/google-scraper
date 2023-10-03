import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

import { FileTypeNotSupportedError } from "../errors.ts";
import { ERROR_MESSAGE } from "../messages.ts";

export function handleError(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(error);
  if (
    error instanceof MulterError ||
    error instanceof FileTypeNotSupportedError
  ) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    ok: false,
    message: ERROR_MESSAGE.SERVER_ERROR,
  });
}
