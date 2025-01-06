import express from "express";
import prisma from "../db/index.js";
import checkAuth from "../middleware/index.js";
import fetchSubscription from "../services/fetchSubscription.js";

const router = express.Router();

// movie list page
router.get("/movies/list", checkAuth, async (req, res) => {
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
  const count = await prisma.movie.count(); // utilizing prisma to hold the amount of data
  const movies = await prisma.movie.findMany({
    // implementing pagination using prisma
    take: 12,
    skip: offset,
  });

  return res.json({ movies, count });
});

router.get("/movie/:id", checkAuth, async (req, res) => {
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

  const movie = await prisma.movie.findUnique({
    // using prisma to find movie by id
    where: {
      id: parseInt(id),
    },  
  });

  

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
