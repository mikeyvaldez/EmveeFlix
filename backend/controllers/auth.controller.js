import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";




export const signup = async (req, res, next) => {
  // we use 'next' to use the middleware
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword }); // if the key and the value are the same you can simply use this shorthand syntax instead of {username:username}.

  // this try/catch block will either save the new user to the database
  // or it will send an error if it is a duplicate or anyother reason
  try {
    await newUser.save();
    res.json("sigun up successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET_KEY);
    const { password: userPassword, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  const { email, name, googelPhotoUrl } = req.body;

  try {
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);
      const {password, ...rest} = user._doc;
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    } else {
      // math.random generates a random number between 0 and 1
      // we then convert that number to letters and numbers by adding toString()
      // the 36 represents the numbers from 0 to 9 and letters from a to z together
      // we get the last 8 letters and numbers by using slice(-8)
      // we make it more secure by doubling and making it 16 characters long
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googelPhotoUrl,
      });
      await newUser.save(); // save the new user
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY); // create the token for the new user
      const { password, ...rest } = newUser._doc;   // we then separate the password and rest of the data from the new user
      
      // here we give a successful response and create a cookie with the access token then secure the session
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    }
  } catch (error) {
    next(error)
  }
}