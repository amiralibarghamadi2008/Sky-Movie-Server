import Validator from "fastest-validator";

const v = new Validator();

const productSchema = {
  title: {
    type: "string",
    min: 2,
    max: 255,
    trim: true,
    messages: { required: "عنوان محصول الزامی است" },
  },
  short_description: {
    type: "string",
    min: 2,
    messages: { required: "توضیحات کوتاه الزامی است" },
  },
  long_description: {
    type: "string",
    min: 2,
    messages: { required: "توضیحات کامل الزامی است" },
  },
  
  // تصویر اصلی (شاخص) مبل
  main_image: {
    type: "string",
    trim: true,
    messages: { required: "تصویر اصلی محصول الزامی است" },
  },

  // گالری تصاویر
  images: {
    type: "array",
    items: "string",
    optional: true,
    default: [],
  },

  // فیلدهای زمان تحویل
  delivery_time: {
    type: "string",
    trim: true,
    optional: true,
    default: "1",
  },
  delivery_time_painted: {
    type: "string",
    trim: true,
    optional: true,
    default: "1",
  },
  delivery_time_raw: {
    type: "string",
    trim: true,
    optional: true,
    default: "1",
  },

  // سیستم قطعات سرویس
  variants: {
    type: "array",
    min: 1,
    messages: { required: "ثبت حداقل یک جزء (تنوع قیمتی) برای مبل الزامی است" },
    items: {
      type: "object",
      props: {
        name: { 
          type: "string", 
          min: 1, 
          trim: true,
          messages: { required: "نام جزء مبل الزامی است" } 
        },
        type: {
          type: "string",
          enum: ["با رنگ و پارچه", "کلاف خام"],
          optional: true,
          default: "با رنگ و پارچه",
        },
        wood_type: {
          type: "string",
          optional: true,
          nullable: true,
          trim: true,
        },
        price: { 
          type: "number", 
          min: 0,
          messages: { required: "قیمت جزء مبل الزامی است" } 
        },
        discount_price: { 
          type: "number", 
          optional: true, 
          default: 0 
        },
        stock: { 
          type: "number", 
          integer: true, 
          min: 0,
          messages: { required: "موجودی جزء مبل الزامی است" } 
        },
      },
    },
  },

  // وضعیت فعال یا غیرفعال بودن
  is_active: {
    type: "boolean",
    optional: true,
    default: true,
  },

  $$strict: true,
};

const validateProduct = v.compile(productSchema);
export default validateProduct;
