import express from "express";
import signup from "../controllers/auth.controller.js";
import { validateSignup } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", validateSignup, signup);
// router.post("/login", login);
// router.post("/logout", logout);


export default router;