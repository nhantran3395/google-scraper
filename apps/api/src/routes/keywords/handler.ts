import { Router } from "express";

import * as keywordRepository from "./keyword.repository";

const router = Router();

router.get("", async (req, res, next) => {
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
});

router.get("/:keywordId", async (req, res, next) => {
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
});

export default router;
