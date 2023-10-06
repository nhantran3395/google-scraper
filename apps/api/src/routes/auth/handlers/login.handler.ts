import { Request, Response } from "express";

import { ERROR_MESSAGE } from "errors";
import { configs } from "configs";

import { generateToken, comparePassword } from "../helpers";
import { userRepository } from "../repositories";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userRepository.getUser(email);

  if (!user) {
    res.status(400).json({
      ok: false,
      message: ERROR_MESSAGE.LOGIN_INVALID_CREDENTIAL,
    });
    return;
  }

  const { password: saltedPassword } = user;

  const isValid = await comparePassword(password, saltedPassword);

  if (!isValid) {
    res.status(400).json({
      ok: false,
      message: ERROR_MESSAGE.LOGIN_INVALID_CREDENTIAL,
    });
    return;
  }

  const jwtSecret = configs.JWT_SECRET;

  res.status(200).json({
    ok: true,
    token: generateToken(email, user.userId, jwtSecret),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}
