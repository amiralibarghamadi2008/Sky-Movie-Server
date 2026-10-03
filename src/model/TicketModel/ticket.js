import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    senderRole: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    text: {
      type: String,
      trim: true,
      required: true,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    subject: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    message: [MessageSchema],
    status: {
      type: String,
      enum: ["pending", "answered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel =
  mongoose.models.ticket || mongoose.model("ticket", TicketSchema);

export default TicketModel;
