import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 30,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /09[0-9]{9}$/,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isBanned : {
      type : Boolean,
      default : false
    },
    movieBookmark: [
      {
        type: mongoose.Types.ObjectId,
        ref: "movie",
      }
    ],
    seriesBookmark: [
      {
        type: mongoose.Types.ObjectId,
        ref: "series",
      }
    ],
    Avatar: {
      type : String,
      default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAjNHd25BO0RAud02eMZOYCqdIck_4GQCJ65QuVq5Yzu-Su7yGQmctGhF&s=10"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual("userTicket", {
  ref: "ticket",
  localField: "_id",
  foreignField: "user",
});

UserSchema.index({ createdAt: -1 });

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
