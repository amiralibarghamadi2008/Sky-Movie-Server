import v from "../config.js";

const genresList = [
  "اکشن",
  "کمدی",
  "درام",
  "ترسناک",
  "علمی تخیلی",
  "عاشقانه",
  "هیجان انگیز",
  "انیمیشن",
  "مستند",
  "جنایی",
  "فانتزی",
  "ماجراجویی",
  "معمایی",
];

const createSeriesSchema = {
  titleSeries: { type: "string", trim: true, min: 2, max: 30 },
  mainImage: { type: "string", trim: true, min: 5 },
  images: {
    type: "array",
    items: "string",
    optional: true,
    default: [],
  },
  shortDes: { type: "string", trim: true, min: 5, max: 100 },
  longDes: {
    type: "multi",
    rules: [
      { type: "string", trim: true, min: 10, max: 1000 },
      { type: "array", items: "string", min: 1 },
    ],
  },
  genres: {
    type: "enum",
    values: genresList,
  },
  director: { type: "string", trim: true, min: 2 },
  status: {
    type: "enum",
    values: ["تکمیل شده", "درحال ضبط"],
  },
  network: { type: "string", trim: true, optional: true },
  IMDbRating: { type: "number", min: 0, max: 10, convert: true },
  $$strict: true,
};

const updateSeriesSchema = {
  ...createSeriesSchema,
  titleSeries: { ...createSeriesSchema.titleSeries, optional: true },
  mainImage: { ...createSeriesSchema.mainImage, optional: true },
  shortDes: { ...createSeriesSchema.shortDes, optional: true },
  longDes: { ...createSeriesSchema.longDes, optional: true },
  genres: { ...createSeriesSchema.genres, optional: true },
  director: { ...createSeriesSchema.director, optional: true },
  status: { ...createSeriesSchema.status, optional: true },
  IMDbRating: { ...createSeriesSchema.IMDbRating, optional: true },
  $$strict: true,
};

export const validateCreateSeries = v.compile(createSeriesSchema);
export const validateUpdateSeries = v.compile(updateSeriesSchema);
