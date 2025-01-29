import movies from "../movies.json" assert { type: "json" };
import { prisma } from "../db/index.js";

const seedMovies = async () => {
  const moviesFormatted = movies.map(
    ({ title, description, thumbnailUrl, videoUrl, duration, genre }) => {
      return {
        title,
        description,
        thumbnailUrl,
        videoUrl,
        duration,
        genre,
      };
    }
  );

  await prisma.movie.deleteMany();

  await prisma.movie.createMany({ data: moviesFormatted });
};

seedMovies();
