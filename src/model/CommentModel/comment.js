import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
    {
        text : {
            type : String,
            trim: true,
            maxLength: 100,
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        movie : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "movie"
        },
        series : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "series"
        },
        article : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "article"
        },
    }
)

const CommentModel = mongoose.models.comment || mongoose.model("comment" , CommentSchema)

export default CommentModel