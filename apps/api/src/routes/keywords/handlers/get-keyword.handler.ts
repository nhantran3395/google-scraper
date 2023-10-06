import { Request, Response, NextFunction } from "express";

import * as keywordRepository from "../repositories";

export async function getKeyword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const keyword = await keywordRepository.getOne(req.params.keywordId);

    if (!keyword) {
      res.json({
        ok: true,
        message: "not found",
      });

      return;
    }

    const keywordConverted = {
      ...keyword,
      resultCount: Number(keyword.resultCount),
      rawHtmlResult: keyword.rawHtmlResult.toString(),
    };

    res.json({
      ok: true,
      keyword: keywordConverted,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
