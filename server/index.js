import express from "express"; // import express
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import SoloMovie from "./models/movie.model.js";

const app = express(); // create express app
// app.use(express.json());


app.use(cors()); // allows traffic to anybody

dotenv.config({ path: "../.env" });

const mongo_url = process.env.MONGO;

mongoose
.connect(mongo_url)
.then(() => {
  console.log("mongodb is connected");    
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.send("Hello There");
});

app.get("/movies/list", (req, res) => {
  const offset = parseInt(req.query.offset);
  const from = offset;
  const to = from + 12;
  const moviesSubset = [...movies].slice(from, to);
  setTimeout(() => {
    return res.json({movies: moviesSubset, count: movies.length});
  }, 3000);
});

app.get("/movie/:id", async (req, res) => {
  // const id = req.params.id;
  // const movie = movies.find((m) => m.id === id);
  const movie = await SoloMovie.findById(req.params.id)
  // console.log(id)
  return res.send(movie);
});

app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
