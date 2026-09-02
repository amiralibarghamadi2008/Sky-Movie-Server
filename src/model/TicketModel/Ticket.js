import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    senderName: {
      type: String,
      default: "کاربر",
    },
    senderRole: {
      type: String,
      enum: ["USER", "ADMIN"],
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    subject: {
      type: String,
      required: [true, "موضوع تیکت الزامی است"],
      trim: true,
      maxLength: 150,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    status: {
      type: String,
      enum: ["PENDING", "ANSWERED", "CLOSED"],
      default: "PENDING",
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  },
);

const TicketModel =
  mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default TicketModel;
