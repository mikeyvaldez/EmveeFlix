import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const mongo_url = process.env.MONGO;

mongoose
  .connect(
    mongo_url
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
