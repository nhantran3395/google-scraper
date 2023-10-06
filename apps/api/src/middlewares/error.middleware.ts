import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

import { ERROR_MESSAGE, FileTypeNotSupportedError } from "errors";

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
