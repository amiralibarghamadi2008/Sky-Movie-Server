import mongoose from "mongoose";

// اسکیمای مربوط به اجزا یا قطعات سرویس مبل
const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام جزء مبل (مثلاً مبل تک یا شاه‌نشین) الزامی است"],
    trim: true,
  },
  // نوع: "با رنگ و پارچه" (کامل) یا "کلاف خام" (بدون رنگ و پارچه)
  type: {
    type: String,
    enum: ["با رنگ و پارچه", "کلاف خام"],
    default: "با رنگ و پارچه",
  },
  // نوع چوب (اختیاری): مثلاً "راش"، "گردو"، "روس" یا خالی
  wood_type: {
    type: String,
    trim: true,
    default: null,
  },
  price: {
    type: Number,
    required: [true, "قیمت این جزء الزامی است"],
    min: [0, "قیمت نمی‌تواند عدد منفی باشد"],
  },
  discount_price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "تعداد موجودی این جزء الزامی است"],
    default: 0,
  }
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان محصول الزامی است"],
      trim: true,
    },
    short_description: {
      type: String,
      required: [true, "توضیحات کوتاه الزامی است"],
    },
    long_description: {
      type: String,
      required: [true, "توضیحات کامل الزامی است"],
    },
    
    // ۱. سیستم قطعات سرویس
    variants: {
      type: [variantSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "هر محصول باید حداقل دارای یک قطعه سرویس باشد.",
      },
    },

    // ۲. فیلدهای زمان تحویل تفکیک‌شده
    delivery_time: {
      type: String,
      default: "1",
      trim: true,
    },
    delivery_time_painted: {
      type: String,
      default: "1",
      trim: true,
    },
    delivery_time_raw: {
      type: String,
      default: "1",
      trim: true,
    },

    // ۳. سیستم گالری تصاویر
    main_image: {
      type: String,
      required: [true, "تصویر اصلی محصول الزامی است"],
    },
    images: {
      type: [String],
      default: [],
    },
    
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  },
);

productSchema.index({ title: "text" });

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
