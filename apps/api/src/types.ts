export type RawKeywordSearchResult = {
  body: string;
  rawHtmlResult: string;
};

export type ProcessedKeywordSearchResult = Omit<
  RawKeywordSearchResult,
  "rawHtmlResult"
> & {
  resultCount: bigint;
  linkCount: number;
  adWordsCount: number;
  rawHtmlResult: Buffer;
};
