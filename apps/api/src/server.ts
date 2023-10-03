import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";

import { registerHandler, tokenMiddleware, loginHandler } from "./modules/auth";
import cors, { handleFileUpload, handleError } from "./middlewares";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors)
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    })
    .post("/login", loginHandler)
    .post("/register", registerHandler)
    .use(tokenMiddleware)
    .get("/keywords", (_req, res) => {
      res.json({
        ok: true,
      });
    })
    .post("/keywords", handleFileUpload, (req, res) => {
      console.log(req.file?.buffer.toString().split("\n").slice(0, -1));
      res.json({
        ok: true,
      });
    })
    .use(handleError);

  return app;
};
