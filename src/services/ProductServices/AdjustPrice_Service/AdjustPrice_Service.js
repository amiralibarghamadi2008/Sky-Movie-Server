import {
  FindProductById_Repo,
  AdjustProductPrices_Repo,
} from "../../../repository/ProductRepository/ProductRepository.js";

export default async function AdjustPrice_Service(id, data) {
  try {
    const { percent, mode, rounding = 1000 } = data;

    // ─── اعتبارسنجی ───
    if (!percent || isNaN(Number(percent)) || Number(percent) <= 0) {
      throw new Error("درصد معتبر وارد کنید");
    }
    if (Number(percent) > 200) {
      throw new Error("درصد نمی‌تواند بیشتر از ۲۰۰٪ باشد");
    }
    if (!["increase", "discount"].includes(mode)) {
      throw new Error("حالت نامعتبر است (increase یا discount)");
    }

    // ─── پیدا کردن محصول ───
    const product = await FindProductById_Repo(id);

    if (!product) {
      throw new Error("محصولی جهت تغییر قیمت یافت نشد");
    }

    // ─── محاسبه ضریب ───
    const p = Number(percent);
    const factor = mode === "increase" ? 1 + p / 100 : 1 - p / 100;
    const roundTo = Number(rounding) > 0 ? Number(rounding) : 1;

    // ─── اعمال روی همه قطعات سرویس ───
    const newVariants = (product.variants || []).map((v) => {
      const newPrice = Math.round(((v.price || 0) * factor) / roundTo) * roundTo;
      return { ...v.toObject(), price: newPrice };
    });

    // ─── ذخیره ───
    const updatedProduct = await AdjustProductPrices_Repo(id, newVariants);

    return {
      success: true,
      message:
        mode === "increase"
          ? `قیمت همه قطعات سرویس محصول با ${p}٪ افزایش یافت`
          : `قیمت همه قطعات سرویس محصول با ${p}٪ تخفیف خورد`,
      updatedProduct,
    };
  } catch (error) {
    throw error;
  }
}
