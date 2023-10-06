import * as cheerio from "cheerio";

import { type ProcessedKeywordResult, type RawKeywordResult } from "types";

export function processResult(
  rawResult: RawKeywordResult
): ProcessedKeywordResult {
  const $ = cheerio.load(rawResult.rawHtmlResult);

  // string contains number of results "About 2,460,000,000 results (0.44 seconds)"
  // inside div with id as "result-stats"
  const statString = $("#result-stats").text();
  const resultCount = extractCount(statString);

  const linkCount = $("a").length;

  // sponsored links contains class .U3A9Ac .qV8iec
  const adWordsCount = $(".U3A9Ac.qV8iec").length;

  return {
    resultCount,
    linkCount,
    adWordsCount,
    rawHtmlResult: Buffer.from(rawResult.rawHtmlResult),
    body: rawResult.body,
  };
}

// extract count from stat string and convert to bigint
// example: "About 2,460,000,000 results (0.44 seconds)" convert to 246000000
// return 0 when cannot convert
function extractCount(statString: string): bigint {
  if (!statString) {
    return BigInt(0);
  }

  try {
    const resultCount = statString.split(" ")[1];
    return BigInt(resultCount?.replace(/,/g, "").replace(/\./g, ""));
  } catch (error) {
    console.error(error);
    return BigInt(0);
  }
}
