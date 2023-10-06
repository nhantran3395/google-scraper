import { Router } from "express";

import { loginHandler, registerHandler } from "./handlers";

const router = Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
