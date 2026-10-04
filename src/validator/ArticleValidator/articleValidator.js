import v from "../config.js";

const createArticleSchema = {
  titleArticle: { type: "string", trim: true, min: 3, max: 100 },
  image: { type: "string", trim: true, min: 5 },
  shortDes: { type: "string", trim: true, min: 10, max: 100 },
  longDes: { type: "string", trim: true, min: 20 },
  $$strict: true,
};

const updateArticleSchema = {
  titleArticle: {
    type: "string",
    trim: true,
    min: 3,
    max: 100,
    optional: true,
  },
  image: { type: "string", trim: true, min: 5, optional: true },
  shortDes: { type: "string", trim: true, min: 10, max: 100, optional: true },
  longDes: { type: "string", trim: true, min: 20, optional: true },
  $$strict: true,
};

export const validateCreateArticle = v.compile(createArticleSchema);
export const validateUpdateArticle = v.compile(updateArticleSchema);
