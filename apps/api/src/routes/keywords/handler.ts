import { Router } from "express";

import * as keywordRepository from "./keyword.repository";
import { type ProcessedKeywordSearchResult } from "../../types";

const keywordsRouter = Router();

keywordsRouter.get("", async (req, res) => {
  let rawKeywords: Array<ProcessedKeywordSearchResult> = [];

  try {
    rawKeywords = await keywordRepository.getAll();
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

export default keywordsRouter;
