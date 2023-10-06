import UserAgent from "user-agents";
import axios from "axios";

import { RawKeywordResult } from "types";

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
      };

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
