import * as cheerio from "cheerio";

import {
  ProcessedKeywordSearchResult,
  RawKeywordSearchResult,
} from "../../types";

export async function scrape(
  keywords: Array<string>
): Promise<Array<RawKeywordSearchResult>> {
  const responses = await Promise.all(
    keywords.map((keyword) => {
      const keywordUrl = `https://google.com/search?hl=en&q=${encodeURIComponent(
        keyword
      )}`;

      console.log(keywordUrl);

      return fetch(
        `http://api.scraperapi.com?api_key=c2d92fd080310fa930cfb871d4ed39cd&url=${keywordUrl}`
      );
    })
  );

  const pages = await Promise.all(responses.map((response) => response.text()));

  return keywords.map((keyword, index) => {
    return {
      body: keyword,
      rawHtmlResult: pages[index],
    };
  });
}

export function processResult(
  rawResult: RawKeywordSearchResult
): ProcessedKeywordSearchResult {
  const $ = cheerio.load(rawResult.rawHtmlResult);

  // string contains number of results
  // inside div id result-stats
  // example: "About 2,460,000,000 results (0.44 seconds) "
  const statistic = $("#result-stats").text();

  const resultCountString = statistic.split(" ")[1];

  // parse string 2,460,000,000 or 2.460.000.000 into bigint
  const resultCount = BigInt(
    resultCountString.replace(/,/g, "").replace(/\./g, "")
  );

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
