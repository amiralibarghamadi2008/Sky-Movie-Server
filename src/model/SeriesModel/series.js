import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
    {
        titelSeries: {
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
        timestamps : true
    }
)

const SeriesModel = mongoose.models.series || mongoose.model("series" , SeriesSchema)

export default SeriesModel