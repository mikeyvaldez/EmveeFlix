import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

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
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", async (req, res) => {
  const bearerToken = req.headers.authorization;  
  if (!bearerToken) return res.send(null);
  const jwt = bearerToken.split("Bearer ")[1];
  if (!jwt) return res.send(null);

  let payload;
  
  try {
    payload = await JWT.verify(jwt, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.send(null);
  }

  const user = await User.findOne({ email });

  return res.json(user);  
});

export default router;
