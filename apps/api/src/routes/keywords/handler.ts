import { Router } from "express";

import * as keywordRepository from "./keyword.repository";
import { type ProcessedKeywordSearchResult } from "../../types";

const keywordsRouter = Router();

keywordsRouter.get("", async (req, res) => {
  const uploadId = (req.query.uploadId as string) || null;

  let rawKeywords: Array<ProcessedKeywordSearchResult> = [];

  try {
    rawKeywords = await keywordRepository.getAll(uploadId);
  } catch (error) {
    console.log(error);
  }

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
});

keywordsRouter.get("/:keywordId", async (req, res) => {
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
  }
});

export default keywordsRouter;
