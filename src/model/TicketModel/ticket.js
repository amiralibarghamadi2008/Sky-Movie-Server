import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    message: {
      type: String,
      trim: true,
      required: true,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "answered"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel =
  mongoose.models.ticket || mongoose.model("ticket", TicketSchema);

export default TicketModel;
