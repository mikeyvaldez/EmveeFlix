import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401, "Unauthorized")); // next() taps into the middleware
    }
    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return next(errorHandler(401, "Unauthorized"));
        }
        req.user = user;  // if no error we get the user info along with the request
        next();  // we then move onto the next thing which is (in our case) update user function
    });
}