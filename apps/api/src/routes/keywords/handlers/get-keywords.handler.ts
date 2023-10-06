import { Request, Response, NextFunction } from "express";

import * as keywordRepository from "../repositories";

export async function getKeywords(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uploadId = (req.query.uploadId as string) || null;
  const userId = req.user?.userId || "";

  try {
    const keywords = await keywordRepository.getAll(uploadId, userId);

    // convert bigint value to int before the keywords can be serializing in JSON
    const convertedKeywords = keywords.map((keyword) => {
      return {
        ...keyword,
        resultCount: Number(keyword.resultCount),
      };
    });

    res.json({
      ok: true,
      keywords: convertedKeywords,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
