import * as cheerio from "cheerio";
import UserAgent from "user-agents";

import {
  type ProcessedKeywordResult,
  type RawKeywordResult,
} from "../../types";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

type KeywordWithUserAgent = {
  keyword: string;
  keywordUrl: string;
  userAgent: string;
};

function addAgentToKeyword(keyword: string): KeywordWithUserAgent {
  return {
    keyword,
    keywordUrl: `https://google.com/search?hl=en&q=${encodeURIComponent(
      keyword
    )}`,
    userAgent: new UserAgent({ deviceCategory: "desktop" }).toString(),
  };
}

export function prepareAgents(
  keywords: Array<string>
): Array<KeywordWithUserAgent> {
  return keywords.map(addAgentToKeyword);
}

export async function scrape(
  keywords: Array<KeywordWithUserAgent>
): Promise<Array<RawKeywordResult>> {
  const responses = await Promise.all(
    keywords.map((keyword) => {
      const { keywordUrl, userAgent } = keyword;

      const headers = {
        "User-Agent": userAgent,
      };

      const option = {
        headers,
        proxy: false,
        httpsAgent: new HttpsProxyAgent("http://15.204.161.192:18080"),
      };

      console.info({ keywordUrl, userAgent });
      // @ts-ignore
      return axios.get(keywordUrl, option);
    })
  );

  const pages = await Promise.all(responses.map((response) => response.data));

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
