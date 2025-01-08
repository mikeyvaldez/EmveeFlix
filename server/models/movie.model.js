import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
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
    }, { timestamp: true }
)

const SoloMovie = mongoose.model("SoloMovie", movieSchema);

export default SoloMovie;