import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

const router = express.Router();

// post requests create data
// this post request creates a new user
router.post(
  // validate input
  "/sign-up",
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6"
    ).isLength({ min: 6 }),
    check(
      "username",
      "Please input a username with a min length of 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, username } = req.body;

    const user = await User.findOne({ email });

    // validate that the user doesn't already exist
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "This user already exists" }],
      });
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // save the user
    const newUser = new User({ username, email, password: hashedPassword });

    // create json web token and referncing environment variable for security purposes
    const token = await JWT.sign(newUser, process.env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: 3600000,
    });

    // return JWT
    return res.json({
      user: newUser,
      token,
    });
  }
);

// validate that the user exists
// validate the password
// rturn a JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: "Ivalid credentials" }],
    });
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: "Ivalid credentials" }],
    });
  }

  const userPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const token = await JWT.sign(
    userPayload,
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: 3600000 }
  );

  // return JWT
  return res.json({
    user: userPayload,
    token,
  });
});

router.get("/me", async (req, res) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken) return res.send(null);

  const jwt = bearerToken.split("Bearer ")[1];
  if(!jwt) return res.send(null);

  let payload
  try {
    payload = await JWT.verify(jwt, process.env.JSON_WEB_TOKEN_SECRET);
  } catch (error) {
    return res.send(null);
  }

  const user = await User.find({ email: payload.email });

  return res.json(user);
})

export default router;
