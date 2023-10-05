import { Router } from "express";
import workerpool from "workerpool";

import { handleFileUpload } from "./upload.middleware";
import { prepareAgents, processResult, scrape } from "./upload.processor";
import * as uploadRepository from "./upload.repository";

const pool = workerpool.pool();

const router = Router();

router.post("", handleFileUpload, async (req, res, next) => {
  const file = req.file;
  const user = req.user;

  if (!user || !file) {
    res.status(400).json({
      ok: false,
      message: "request is invalid",
    });

    return;
  }

  const keywords = file.buffer.toString().split("\n") || [];

  try {
    const rawResults = await pool.exec(scrape, [prepareAgents(keywords)]);
    await pool.terminate();

    const processedResults = rawResults.map(processResult);
    await uploadRepository.createNew(user.userId, file, processedResults);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("", async (req, res, next) => {
  const user = req.user;

  if (!user) {
    res.status(400).json({
      ok: false,
      message: "request is invalid",
    });

    return;
  }

  try {
    const uploads = await uploadRepository.getAll(user.userId);

    res.json({
      ok: true,
      uploads,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
