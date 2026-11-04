import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
    {
        text : {
            type : String,
            trim: true,
            maxLength: 300,
            required : true
        },
        score : {
            type : Number,
            default : 5
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
        },
        movie : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "movie",
        },
        series : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "series",
        },
        article : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "article",
        },
    },
    {
        timestamps : true
    }
)

CommentSchema.index({ movie: 1 });

CommentSchema.index({ series: 1 });

CommentSchema.index({ article: 1 });

CommentSchema.index({ user: 1 });

CommentSchema.index({ createdAt: -1 });

const CommentModel = mongoose.models.comment || mongoose.model("comment" , CommentSchema)

export default CommentModel