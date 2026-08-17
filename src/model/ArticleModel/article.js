import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
    {
        titleArticle : {
            type : String,
            required: true,
            trim : true
        },
        image: {
          type: String,
          required : true,
        },
        shortDes: {
            type: String,
            trim: true,
            required: true,
            maxLength: 100,
        },
        longDes: {
          type: String,
          trim: true,
          required: true,
        },
    },
    {
        timestamps : true,
        toJSON : {virtuals : true},
        toObject : {virtuals : true},
    }
)

ArticleSchema.virtual("articleComments" , {
    ref : "comment",
    localField : "_id",
    foreignField: "article",
})

const ArticleModel = mongoose.models.article || mongoose.model("article" , ArticleSchema)

export default ArticleModel