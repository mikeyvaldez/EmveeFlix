import mongoose from "mongoose";

const movieSchema = mongoose.Schema({

    id: {
        type: String,
        required: true,        
    },
    title: {
        type: String,
        required: true,        
    },
    description: {
        type: String,
        required: true,        
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },			
    videoUrl: {
        type: String,
        required: true,
    },			
    duration: {
        type: String,
        required: true,
    },			
    genre: {
        type: String,
        required: true,
    },			

}, { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;