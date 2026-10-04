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
        isAccept : {
            type : Boolean,
            default : false
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        },
        movie : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "movie",
            required : true
        },
        series : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "series",
            required : true
        },
        article : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "article",
            required : true
        },
    }
)

const CommentModel = mongoose.models.comment || mongoose.model("comment" , CommentSchema)

export default CommentModel