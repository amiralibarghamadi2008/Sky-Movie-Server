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

TicketSchema.index({subject : 1})

TicketSchema.index({user : 1})

TicketSchema.index({ createdAt: -1 });

TicketSchema.index(
  {
    subject: "text",
    message: "text",
  },
  {
    weights: {
      subject: 10,
      message: 3,
    },
    default_language: "none",
  }
);

const TicketModel =
  mongoose.models.ticket || mongoose.model("ticket", TicketSchema);

export default TicketModel;
