// @ts-ignore
import process from "node:process";

export const CONFIGS = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET || "cookies",
};
