import { type Upload } from "./upload.type";
import { type Keyword } from "./keyword.type";

export type LoginResponse = {
  ok: boolean;
  token: string;
  message: string;
  email: string;
  firstName: string;
  lastName: string;
};

export function validateLoginResponse(data: any): data is LoginResponse {
  return (
    data.hasOwnProperty("ok") &&
    data.hasOwnProperty("token") &&
    data.hasOwnProperty("email") &&
    data.hasOwnProperty("firstName") &&
    data.hasOwnProperty("lastName")
  );
}

export type GetUploadsResponse = {
  ok: boolean;
  uploads: Array<Upload>;
};

export type GetKeywordsResponse = {
  ok: boolean;
  keywords: Array<Keyword>;
};

export type GetKeywordResponse = {
  ok: boolean;
  keyword: Keyword;
};
