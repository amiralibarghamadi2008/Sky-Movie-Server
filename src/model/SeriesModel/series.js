import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
    {
        titleSeries: {
          type: String,
          trim: true,
          required: true,
          maxLength: 30,
        },
        slug: {
          type: String,
          trim: true,
          required: true,
          maxLength: 35,
          unique : true 
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
          type: [ String ],
          trim: true,
          required: true,
          maxLength: 1000,
        },
        genres: {
          type: String,
          enum: ["اکشن","کمدی","درام","ترسناک","علمی تخیلی","عاشقانه","هیجان انگیز","انیمیشن","مستند","جنایی","فانتزی","ماجراجویی","معمایی"],
          required: [true, "ژانر سریال الزامی هست"],
        },
        director: {
          type: String,
          trim: true,
          required: true,
        },
        status: {
          type: String,
          enum: ["تکمیل شده", "درحال ضبط"],
          required: true
        },
        network: {
            type : String,
            trim : true
        },
        IMDbRating: {
          type : Number,
          required: true,
        }
    },
    {
        timestamps : true,
        toJSON : {virtuals : true},
        toObject : {virtuals : true},
    }
)

SeriesSchema.virtual("episodes" , {
    ref : "episode",
    localField : "_id",
    foreignField: "series",
})

SeriesSchema.virtual("seriesComments" , {
    ref : "comment",
    localField : "_id",
    foreignField: "series",
})

SeriesSchema.index({ createdAt: -1 });

SeriesSchema.index({ genres : 1 })

SeriesSchema.index({ titleSeries : 1 })

SeriesSchema.index(
  {
    titleSeries: "text",
    genres: "text",
    shortDes: "text",
  },
  {
    weights: {
      titleSeries: 10,
      genres: 5,
      shortDes: 1,
    },
    default_language: "none",
  }
);

const SeriesModel = mongoose.models.series || mongoose.model("series" , SeriesSchema)

export default SeriesModel