import v from "../config.js";

const createSliderSchema = {
  title: {
    type: "string",
    trim: true,
    min: 2,
    max: 60,
  },
  image: {
    type: "string",
    trim: true,
    min: 5,
  },
  link: {
    type: "string",
    trim: true,
    min: 1,
  },
  $$strict: true,
};

export const validateCreateSlider = v.compile(createSliderSchema);
