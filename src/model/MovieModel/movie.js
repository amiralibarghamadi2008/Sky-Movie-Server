import mongoose from "mongoose";

const DownloadLinkSchema = new mongoose.Schema (
  {
    quality : {
      type : String,
      required : true,
      trim : true
    },
    fileSize : {
      type : String,
      trim : true
    },
    directDownloadLink : {
      type : String,
      required : true,
      trim : true
    },
  }
)  

const MovieSchema = new mongoose.Schema(
  {
    titleMovie: {
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
      maxLength: 100,
    },
    longDes: {
      type: String,
      trim: true,
      required: true,
      maxLength: 1000,
    },
    genres: {
      type: [ String ],
      enum: ["اکشن","کمدی","درام","ترسناک","علمی تخیلی","عاشقانه","هیجان انگیز","انیمیشن","مستند","جنایی","فانتزی","ماجراجویی","معمایی"],
      required: [true, "ژانر فیلم الزامی هست"],
    },
    duration : {
      type : String,
      required: true,
    },
    director: {
      type: String,
      trim: true,
      required: true,
    },
    IMDbRating: {
      type : Number,
      required: true,
    },
    downloadLinks: {
      type : [ DownloadLinkSchema ],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MovieSchema.virtual("movieComments", {
  ref: "comment",
  localField: "_id",
  foreignField: "movie",
});

const MovieModel =
  mongoose.models.movie || mongoose.model("movie", MovieSchema);

export default MovieModel;
