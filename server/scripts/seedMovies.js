import movies from "../movies.json" with { type: "json" };
import Movie from "../models/movies.model.js";
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config({ path: "../../.env" })

const mongo_url = process.env.MONGO;

mongoose.connect(mongo_url).then(() => {
  console.log("MongoDB Connection Successful")
})


const seedMovies = async () => {
  const moviesFormatted = movies.map(
    ({ id, title, description, thumbnailUrl, videoUrl, duration, genre }) => {
      return {
        id,
        title,
        description,
        thumbnailUrl,
        videoUrl,
        duration,
        genre,
      };
    }
  );

  await Movie.deleteMany();
  await Movie.insertMany(moviesFormatted);
}

seedMovies();

// mongoose.disconnect();