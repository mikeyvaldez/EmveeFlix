import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/movie.model.js";
import { movies } from "./movies.js";

dotenv.config({ path: "../../.env" });

const mongo_url = process.env.MONGO;


// Whenever the movies file is updated with a new movie
// which will be managed manually
// use the deleteData function and comment out the importData function
// run the file using node.
// once deleted, do the same for importData to update the movies.

// Import the data to DB
const importData = async () => {
  try {
    await Movie.create(movies);
    console.log("Data successfully imported");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("mongodb is connected");
    importData();
    // deleteData();
  })
  .catch((err) => {
    console.log(err);
  });
