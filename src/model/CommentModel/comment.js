import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
    {
        text : {
            type : String,
            trim: true,
            maxLength: 100,
        },
        user : {
            type : mongoose.Types.ObjectId,
            ref : "user"
        },
        movie : {
            type : mongoose.Types.ObjectId,
            ref : "movie"
        },
    }
)

const CommentModel = mongoose.models.comment || mongoose.model("comment" , CommentSchema)

export default CommentModel