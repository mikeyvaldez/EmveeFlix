import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

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

// ser