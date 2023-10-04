import * as cheerio from "cheerio";

import {
  ProcessedKeywordSearchResult,
  RawKeywordSearchResult,
} from "../../types";

export async function scrape(
  keywords: Array<string>
): Promise<Array<RawKeywordSearchResult>> {
  const responses = await Promise.all(
    keywords.map((keyword) =>
      fetch(
        `https://google.com/search?hl=en&q=${encodeURIComponent(keyword)}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
          },
        }
      )
    )
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

  const resultCount = BigInt(statistic.split(" ")[1].replace(/,/g, ""));
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
