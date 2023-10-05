import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { checkToken } from "./auth.helper";
import { ERROR_MESSAGE } from "../../messages";
import { configs } from "../../configs";

declare module "express-serve-static-core" {
  interface Request {
    user: jwt.JwtPayload | undefined;
  }
}

export default function tokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({
      ok: false,
      message: ERROR_MESSAGE.AUTH_BEARER_TOKEN_NOT_EXIST,
    });
    return;
  }

  const [, token] = bearer.split("Bearer ");
  if (!token) {
    res.status(401).json({
      ok: false,
      message: ERROR_MESSAGE.AUTH_TOKEN_INVALID_FORMAT,
    });
    return;
  }

  const secret = configs.JWT_SECRET;
  let payload: string | jwt.JwtPayload = {};

  try {
    payload = checkToken(token, secret);
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: ERROR_MESSAGE.AUTH_TOKEN_INVALID,
    });
    return;
  }

  if (typeof payload === "string") {
    res.status(400).json({
      ok: false,
      message: ERROR_MESSAGE.AUTH_INVALID_TOKEN_PAYLOAD,
    });
    return;
  }

  req.user = payload;
  next();
}
