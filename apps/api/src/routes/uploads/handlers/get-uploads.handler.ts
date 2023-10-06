import { Request, Response, NextFunction } from "express";

import { uploadRepository } from "../repositories";

export async function getUploadsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  if (!user) {
    res.status(400).json({
      ok: false,
      message: "request is invalid",
    });

    return;
  }

  try {
    const uploads = await uploadRepository.getAll(user.userId);

    res.json({
      ok: true,
      uploads,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
