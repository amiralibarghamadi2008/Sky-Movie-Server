/**
 * UploadController.js — آپلود و حذف عکس محصول
 *
 * دو endpoint داریم:
 *
 * 1) POST /admin/products/upload-image
 *    فرمت: multipart/form-data
 *    - اگه فیلد "image" فرستاده بش (تک‌عکس) → response: { success, message, url }
 *    - اگه فیلد "images" فرستاده بش (چندعکس) → response: { success, message, urls }
 *
 * 2) DELETE /admin/products/delete-images
 *    فرمت: JSON
 *    body: { urls: ["/img/uploads/products/xxx.jpg", ...] }
 *    → response: { success, message, deleted, failed }
 */

import {
  deleteImageByUrl,
  deleteImagesByUrls,
} from "../../utils/uploader/uploader.js";

// ══════════════════════════════════════════════════════════════
// 1) آپلود عکس محصول — POST /admin/products/upload-image
// ══════════════════════════════════════════════════════════════
export default async function UploadProductImage_Controller(req, res) {
  try {
    // حالت چندعکسی — فیلد "images"
    if (req.files && req.files.images && req.files.images.length > 0) {
      const urls = req.files.images.map(
        (file) => `/img/uploads/products/${file.filename}`,
      );
      return res.status(201).json({
        success: true,
        message: "فایل‌ها با موفقیت آپلود شدند",
        urls,
      });
    }

    // حالت تک‌عکسی — فیلد "image"
    if (req.files && req.files.image && req.files.image.length > 0) {
      const fileUrl = `/img/uploads/products/${req.files.image[0].filename}`;
      return res.status(201).json({
        success: true,
        message: "فایل با موفقیت آپلود شد",
        url: fileUrl,
      });
    }

    // اگه هیچ فایلی فرستاده نشد
    return res.status(400).json({
      success: false,
      message: "هیچ فایلی آپلود نشده است یا فرمت فایل مجاز نیست.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "خطای داخلی سرور در آپلود فایل",
      error: error.message,
    });
  }
}

// ══════════════════════════════════════════════════════════════
// 2) حذف عکس‌های محصول — DELETE /admin/products/delete-images
// ══════════════════════════════════════════════════════════════
export async function DeleteProductImages_Controller(req, res) {
  try {
    const { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "آرایه‌ی urls الزامی است",
      });
    }

    const result = deleteImagesByUrls(urls);

    return res.status(200).json({
      success: true,
      message: `${result.deleted} عکس از ${urls.length} عکس با موفقیت حذف شد`,
      deleted: result.deleted,
      failed: result.failed,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "خطای داخلی سرور در حذف عکس",
      error: error.message,
    });
  }
}

/**
 * تابع کمکی (بدون endpoint) — برای استفاده در سرویس‌های دیگه
 * مثال:
 *   import { deleteImageByUrl } from '../../utils/uploader/uploader.js';
 *   if (product.main_image) deleteImageByUrl(product.main_image);
 *   if (product.images?.length) product.images.forEach(deleteImageByUrl);
 */
export { deleteImageByUrl, deleteImagesByUrls };
