import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

dotenv.config({ path: "../../.env" });

// user signup ----------------------------------------------------------------------
export async function signup(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password, username } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      errors: [{ msg: "This user already exists" }],
    });
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  generateTokenAndSetCookie(newUser._id, res);
  await newUser.save();

  res.status(201).json({
    success: true,
    user: {
      ...newUser._doc,
      password: "",
    },
  });
}
// end of user signup -------------------------------------------------------------------------

// user login -----------------------------------------------------------------------------------
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: "Invalid credentials" }],
    });
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: "Invalid credentials" }],
    });
  }

  const userPayload = {
    ...user._doc,
    password: "",
  };

  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    success: true,
    user: userPayload
  });
}
// end of user login ----------------------------------------------------------------

// user logout ---------------------------------------------------------------------------
export async function logout(req, res) {
	try {
		res.clearCookie("token");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
// end of user logout ---------------------------------------------------------------------------

// authentication check -----------------------------------------------------------------------
export async function me(req, res) {
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
}
// end of authentication check ------------------------------------------------------------------