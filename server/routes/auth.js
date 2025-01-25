import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { check } from "express-validator";

const router = express.Router();

const validateSignup = [
  check("email", "Please input a valid email").isEmail(),
  check("password", "Please input a password with a min length of 6").isLength({
    min: 6,
  }),
  check("username", "Please input a username with a min length of 6").isLength({
    min: 6,
  }),
];

router.post("/signup", validateSignup, signup);

// router.post("/login", login);
// router.post("/logout", logout);

export default router;
