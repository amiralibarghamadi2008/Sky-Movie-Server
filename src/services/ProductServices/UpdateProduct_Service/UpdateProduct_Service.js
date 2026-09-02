import {
  UpdateProduct_Repo,
  FindProductById_Repo,
} from "../../../repository/ProductRepository/ProductRepository.js";
import { deleteImageByUrl } from "../../../utils/uploader/uploader.js";

export default async function UpdateProduct_Service(id, data) {
  // ۱. خواندن اطلاعات قبلی محصول برای مقایسه عکس‌ها
  const oldProduct = await FindProductById_Repo(id);

  const updatedProduct = await UpdateProduct_Repo(id, data);

  if (!updatedProduct) {
    throw new Error("محصولی جهت ویرایش یافت نشد");
  }

  // ۲. پاک کردن خودکار عکس‌هایی که در ویرایش جدید حذف شده‌اند
  if (oldProduct) {
    const newMain = data.main_image;
    const newGallery = data.images || [];

    // اگر عکس اصلی تغییر کرده، عکس اصلی قبلی را حذف کن
    if (
      oldProduct.main_image &&
      oldProduct.main_image !== newMain &&
      !newGallery.includes(oldProduct.main_image)
    ) {
      deleteImageByUrl(oldProduct.main_image);
    }

    // عکس‌های گالری قبلی که در گالری جدید نیستند و عکس اصلی هم نیستند را حذف کن
    if (oldProduct.images && Array.isArray(oldProduct.images)) {
      for (const oldImg of oldProduct.images) {
        if (oldImg && !newGallery.includes(oldImg) && oldImg !== newMain) {
          deleteImageByUrl(oldImg);
        }
      }
    }
  }

  return {
    success: true,
    message: "محصول با موفقیت ویرایش شد",
    updatedProduct,
  };
}
