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
      enum: ["اکشن","کمدی","درام","ترسناک","علمی تخیلی","عاشقانه","هیجان انگیز","انیمیشن","مستند","جنایی","فانتزی","ماجراجویی","معمایی"],
      required: [true, "ژانر فیلم الزامی هست"],
    },
    director: {
      type: String,
      trim: true,
      required: true,
    },
    IMDbRating: {
      type : Number,
      required: true,
    }
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
