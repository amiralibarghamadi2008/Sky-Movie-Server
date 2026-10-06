import v from "../config.js";

const createCommentSchema = {
  text: {
    type: "string",
    trim: true,
    min: 3,
    max: 300,
    messages: {
      stringMin: "متن نظر نمی‌تواند کمتر از ۳ کاراکتر باشد.",
      stringMax: "متن نظر نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد.",
    },
  },
  score: {
    type: "number",
    integer: true,
    min: 1,
    max: 5,
    optional: true,
    default: 5,
    convert: true,
  },
  movie: { type: "objectId", optional: true },
  series: { type: "objectId", optional: true },
  article: { type: "objectId", optional: true },
  $$strict: true,
};

export const validateCreateComment = v.compile(createCommentSchema);
