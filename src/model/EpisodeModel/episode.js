import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema(
    {
        titleEpisode : {
           type : String,
            required: true,
            trim : true
        },
        seasonNumber : {
           type : Number,
            required: true,
        },
        episodeNumber : {
           type : Number,
            required: true,
        },
        duration : {
           type : String,
            required: true,
        },
        series : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "series",
            required : true
        }
    },
    {
        timestamps : true,
    }
)

const EpisodeModel = mongoose.models.episode || mongoose.model("episode" , EpisodeSchema)

export default EpisodeModel