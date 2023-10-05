import * as cheerio from "cheerio";
import UserAgent from "user-agents";

import {
  type ProcessedKeywordResult,
  type RawKeywordResult,
} from "../../types";

type KeywordWithAgent = {
  keyword: string;
  agent: string;
};

export function prepareAgents(
  keywords: Array<string>
): Array<KeywordWithAgent> {
  return keywords.map((keyword) => {
    return {
      keyword,
      agent: new UserAgent().toString(),
    };
  });
}

export async function scrape(
  keywords: Array<KeywordWithAgent>
): Promise<Array<RawKeywordResult>> {
  const responses = await Promise.all(
    keywords.map((keyword) => {
      const keywordUrl = `https://google.com/search?hl=en&q=${encodeURIComponent(
        keyword.keyword
      )}`;

      console.info(keywordUrl, keyword.agent);

      const headers = {
        "User-Agent": keyword.agent,
      };

      const option = {
        headers,
      };

      return fetch(keywordUrl, option);
    })
  );

  const pages = await Promise.all(responses.map((response) => response.text()));

  return keywords.map((keyword, index) => {
    return {
      body: keyword.keyword,
      rawHtmlResult: pages[index],
    };
  });
}

export function processResult(
  rawResult: RawKeywordResult
): ProcessedKeywordResult {
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
