import type {Keyword} from "@/models/keyword.model";

export type GetKeywordsResponse = {
  ok: boolean;
  keywords: Array<Keyword>;
};

export type GetKeywordResponse = {
  ok: boolean;
  keyword: Keyword;
};