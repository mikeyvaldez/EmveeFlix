import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri = process.env.MONGO

mongoose
  .connect(
    mongo_uri
  )
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
