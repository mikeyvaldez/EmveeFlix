import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const secureRoute = async (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No Token Provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Invalid Token" });
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  req.user = user;

  next();
};
