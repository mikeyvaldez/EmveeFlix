import movies from "../movies.json";
// import prisma from "../db/index.js";           // convert to mongoose******************

// NOTE: figure out whether I need this file since I am now using mongo?
// if I do, then convert this to mongoose

const seedMovies = async () => {
    const moviesFormatted = movies.map(({ title, description, thumbnailUrl, videoUrl, duration, genre }) => {
        return {
            title,
            description,
            thumbnailUrl,
            videoUrl, 
            duration,
            genre
        };
    });

    // await prisma.movie.deleteMany();   // convert to mongoose*******************************

    // await prisma.movie.createMany({ data: moviesFormatted });     // convert to mongoose******************************
}

seedMovies()