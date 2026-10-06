import v from "../config.js";

const genresList = [
  "اکشن", "کمدی", "درام", "ترسناک", "علمی تخیلی", "عاشقانه",
  "هیجان انگیز", "انیمیشن", "مستند", "جنایی", "فانتزی", "ماجراجویی", "معمایی"
];

const downloadLinkSchema = {
  type: "object",
  props: {
    quality: { type: "string", trim: true, min: 2 },
    fileSize: { type: "string", trim: true, optional: true },
    directDownloadLink: { type: "string", trim: true, min: 5 },
  },
};

const createMovieSchema = {
  titleMovie: { type: "string", trim: true, min: 2, max: 30 },
  slug: { type: "string", trim: true, min: 2, max: 35 },
  mainImage: { type: "string", trim: true, min: 5 },
  images: {
    type: "array",
    items: "string",
    optional: true,
    default: [],
  },
  shortDes: { type: "string", trim: true, min: 5, max: 100 },
  longDes: { type: "string", trim: true, min: 10, max: 1000 },
  genres: {
    type: "array",
    items: {
      type: "enum",
      values: genresList,
    },
    min: 1,
    messages: {
      arrayEmpty: "حداقل انتخاب یک ژانر برای فیلم الزامی است.",
    },
  },
  duration: { type: "string", trim: true, min: 1 },
  director: { type: "string", trim: true, min: 2 },
  IMDbRating: { type: "number", min: 0, max: 10, convert: true },
  downloadLinks: {
    type: "array",
    items: downloadLinkSchema,
    min: 1,
    messages: {
      arrayEmpty: "حداقل باید یک لینک دانلود برای فیلم ثبت شود.",
    },
  },
  $$strict: true,
};

const updateMovieSchema = {
  ...createMovieSchema,
  titleMovie: { ...createMovieSchema.titleMovie, optional: true },
  slug: { ...createMovieSchema.slug, optional: true },
  mainImage: { ...createMovieSchema.mainImage, optional: true },
  shortDes: { ...createMovieSchema.shortDes, optional: true },
  longDes: { ...createMovieSchema.longDes, optional: true },
  genres: { ...createMovieSchema.genres, optional: true },
  duration: { ...createMovieSchema.duration, optional: true },
  director: { ...createMovieSchema.director, optional: true },
  IMDbRating: { ...createMovieSchema.IMDbRating, optional: true },
  downloadLinks: { ...createMovieSchema.downloadLinks, optional: true },
  $$strict: true,
};

export const validateCreateMovie = v.compile(createMovieSchema);
export const validateUpdateMovie = v.compile(updateMovieSchema);