import express from "express";
import Movie from "../models/movie.model.js";
import { verifyToken } from "../utils/verifyUser.js";
import fetchSubscription from "../services/fetchSubscription.js";

const router = express.Router();

// movie list page
router.get("/movies/list", verifyToken, async (req, res) => {
  const subscription = await fetchSubscription(req.user.email);

  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized: no plan",
        },
      ],
    });
  }

  const offset = parseInt(req.query.offset);
  const count = await Movie.count(); // utilizing prisma to hold the amount of data
  const movies = await Movie.find({
    // implementing pagination using prisma
    limit: 12,
    skip: offset,
  });

  return res.json({ movies, count });
});

router.get("/movie/:id", verifyToken, async (req, res) => {
  const subscription = await fetchSubscription(req.user.email);

  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized: no plan",
        },
      ],
    });
  }

  const id = req.params.id;

  const movie = await Movie.findOne({ id: parseInt(id) });  

  if(movie.title === "Trailer Park Boys" && subscription.name === "Basic Plan"){
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized: Need Premium Plan",
        },
      ],
    });
  }

  return res.send(movie);
});

export default router;