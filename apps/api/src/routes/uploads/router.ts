import { Router } from "express";

import { createNewUploadHandler, getUploadsHandler } from "./handlers";
import { handleFileUpload } from "./middlewares";

const router = Router();

router.post("", handleFileUpload, createNewUploadHandler);
router.get("", getUploadsHandler);

export default router;
