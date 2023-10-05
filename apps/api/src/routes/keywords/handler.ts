import { Router } from "express";

import * as keywordRepository from "./keyword.repository";

const router = Router();

router.get("", async (req, res, next) => {
  const uploadId = (req.query.uploadId as string) || null;

  try {
    const rawKeywords = await keywordRepository.getAll(uploadId);

    const keywords = rawKeywords.map((raw) => {
      return {
        ...raw,
        resultCount: Number(raw.resultCount),
        rawHtmlResult: raw.rawHtmlResult.toString(),
      };
    });

    res.json({
      ok: true,
      keywords,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:keywordId", async (req, res, next) => {
  try {
    const rawKeyword = await keywordRepository.getOne(req.params.keywordId);

    if (!rawKeyword) {
      res.json({
        ok: true,
        message: "keyword not found",
      });

      return;
    }

    const keyword = {
      ...rawKeyword,
      resultCount: Number(rawKeyword.resultCount),
      rawHtmlResult: rawKeyword.rawHtmlResult.toString(),
    };

    res.json({
      ok: true,
      keyword,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
