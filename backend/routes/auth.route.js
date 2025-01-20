import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

// the functions are built in the controllers directory then imported into this file.
// helps keep the code clean.
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google)

export default router;