import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { check } from "express-validator";
import { handleValidationErrors } from "../utils/validation.js"


export const validateSignup = [
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),    
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors    
  ];

export async function signup(req, res){
    const { username, email, password } = req.body;

    // const emailAlreadyExists = await User.findOne({ email });

    // if(emailAlreadyExists){
    //     res.status(403);
    //     res.json({
    //         message: "User already exists",
    //     })
    // }

    const user = await User.signup({ username, email, password })

}