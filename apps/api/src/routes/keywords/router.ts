import { Router } from "express";

import { getKeyword, getKeywords } from "./handlers";

const router = Router();

router.get("", getKeywords);
router.get("/:keywordId", getKeyword);

export default router;
