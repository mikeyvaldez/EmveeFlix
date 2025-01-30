import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path:"../../.env" })

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(403).json({
      errors: [{ msg: "No token provided" }],
    });
  }

  const jwt = bearerToken.split("Bearer ")[1];

  if (!jwt) {
    return res.status(403).json({
      errors: [{ msg: "Invalid token format" }],
    });
  }

  try {
    const payload = JWT.verify(jwt, process.env.JWT_SECRET_KEY);
    req.user = payload; // Attach user info to the request object    
    
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({
      errors: [{ msg: "Invalid or expired token" }],
    });
  }
};