export type RawKeywordResult = {
  body: string;
  rawHtmlResult: string;
};

export type ProcessedKeywordResult = Omit<RawKeywordResult, "rawHtmlResult"> & {
  resultCount: bigint;
  linkCount: number;
  adWordsCount: number;
  rawHtmlResult: Buffer;
};
