import { type SearchResult } from "./search-result.type";

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
    data.hasOwnProperty("message") &&
    data.hasOwnProperty("email") &&
    data.hasOwnProperty("firstName") &&
    data.hasOwnProperty("lastName")
  );
}

export type FileUploadResponse = {
  ok: boolean;
  data: Array<SearchResult>;
};

export function validateFileUploadResponse(
  data: any
): data is FileUploadResponse {
  console.log("validating file upload response");

  return (
    data.hasOwnProperty("ok") &&
    data.hasOwnProperty("data") &&
    Array.isArray(data.data)
  );
}
