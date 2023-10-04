import { Router } from "express";
import workerpool from "workerpool";

import { DatabaseClient } from "../../infra";

import { handleFileUpload } from "./upload.middleware";
import { processResult, scrape } from "./upload.processor";

const pool = workerpool.pool();

const uploadsRouter = Router();

uploadsRouter.post("", handleFileUpload, async (req, res) => {
  const file = req.file;
  const user = req.user;

  if (!user) {
    throw new Error("user must exist");
  }

  if (!file) {
    throw new Error("file must not be empty");
  }

  const keywords = file.buffer.toString().split("\n") || [];

  try {
    const rawResults = await pool.exec(scrape, [keywords]);
    await pool.terminate();

    const processedResults = rawResults.map(processResult);

    await DatabaseClient.upload.create({
      data: {
        userId: user.userId,
        name: file.originalname,
        keywordCount: keywords.length,
        keywords: {
          create: [...processedResults],
        },
      },
    });

    res.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
});

uploadsRouter.get("", async (_req, res) => {
  const uploads = await DatabaseClient.upload.findMany();

  res.json({
    ok: true,
    uploads,
  });
});

export default uploadsRouter;
