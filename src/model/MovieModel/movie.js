import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    titelMovie: {
      type: String,
      trim: true,
      required: true,
      maxLength: 30,
    },
    mainImage: {
      type: String,
      required: [true, "تصویر اصلی محصول الزامی است"],
    },
    images: {
      type: [String],
      default: [],
    },
    shortDes: {
      type: String,
      trim: true,
      required: true,
      maxLength: 25,
    },
    longtDes: {
      type: String,
      trim: true,
      required: true,
      maxLength: 300,
    },
    genres: {
      type: String,
      enum: [""],
      required: [true, "ژانر فیلم الزامی هست"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MovieSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "movie",
});

const MovieModel =
  mongoose.models.movie || mongoose.model("movie", MovieSchema);

export default MovieModel;
