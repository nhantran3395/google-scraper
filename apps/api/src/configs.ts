import process from "node:process";

export const configs = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET || "cookies",
  CORS_WHITELIST: process.env.CORS_WHITELIST
    ? process.env.CORS_WHITELIST.split(",")
    : [],
  FILE_UPLOAD_MAX_KEYWORD_LIMIT: process.env.FILE_UPLOAD_MAX_KEYWORD_LIMIT
    ? Number(process.env.FILE_UPLOAD_MAX_KEYWORD_LIMIT)
    : 100,
  FILE_UPLOAD_MAX_SIZE: process.env.FILE_UPLOAD_MAX_SIZE
    ? Number(process.env.FILE_UPLOAD_MAX_SIZE)
    : 1024,
};
