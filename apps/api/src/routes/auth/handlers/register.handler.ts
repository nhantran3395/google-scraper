import { Request, Response } from "express";

import { ERROR_MESSAGE } from "errors";

import { hashPassword } from "../helpers";
import { userRepository } from "../repositories";

interface UniqueConstraintViolationError {
  name: "PrismaClientKnownRequestError";
  code: "P2002";
  meta: unknown;
}

function isUniqueConstraintViolationError(
  obj: any
): obj is UniqueConstraintViolationError {
  return (
    obj.hasOwnProperty("name") &&
    obj.name === "PrismaClientKnownRequestError" &&
    obj.hasOwnProperty("code") &&
    obj.code === "P2002"
  );
}

export async function registerHandler(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;
  const SALT_ROUNDS = 10;

  const hashedPassword = await hashPassword(password, SALT_ROUNDS);

  try {
    await userRepository.createUser({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    res.status(200);
    res.json({
      ok: true,
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      console.error("unexpected error:", error);

      res.status(500).json({
        ok: false,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
      return;
    }

    if (isUniqueConstraintViolationError(error)) {
      res.status(400).json({
        ok: false,
        message: ERROR_MESSAGE.REGISTER_EMAIL_ALREADY_EXIST,
      });
      return;
    }

    res.status(500).json({
      ok: false,
      message: ERROR_MESSAGE.SERVER_ERROR,
    });
  }
}
