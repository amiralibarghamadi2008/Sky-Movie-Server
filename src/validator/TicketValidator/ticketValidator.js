import v from "../config.js";

const sendTicketSchema = {
  subject: {
    type: "string",
    trim: true,
    min: 3,
    max: 50,
    messages: {
      stringMin: "موضوع تیکت باید حداقل ۳ کاراکتر باشد.",
      stringMax: "موضوع تیکت نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.",
    },
  },
  message: {
    type: "string",
    trim: true,
    min: 5,
    max: 500,
    messages: {
      stringMin: "متن تیکت باید حداقل ۵ کاراکتر باشد.",
      stringMax: "متن تیکت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.",
    },
  },
  $$strict: true,
};

const answerTicketSchema = {
  subject: { type: "string", trim: true, min: 3, max: 50, optional: true },
  message: {
    type: "string",
    trim: true,
    min: 2,
    max: 500,
    messages: {
      stringMin: "متن پاسخ نمی‌تواند کمتر از ۲ کاراکتر باشد.",
    },
  },
  $$strict: true,
};

export const validateSendTicket = v.compile(sendTicketSchema);
export const validateAnswerTicket = v.compile(answerTicketSchema);
