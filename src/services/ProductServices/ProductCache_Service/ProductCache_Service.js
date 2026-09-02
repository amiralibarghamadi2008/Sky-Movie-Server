/**
 * ProductCache_Service.js — کش محصولات در Redis با پایداری و سرعت بالا
 */

import { FindAllProducts_Repo, FindProductById_Repo } from "../../../repository/ProductRepository/ProductRepository.js";
import { redisGet, redisSet, redisDel } from "../../../utils/Redis/redisClient.js";

const ALL_PRODUCTS_CACHE_KEY = "mavara:products:all";
const SINGLE_PRODUCT_PREFIX = "mavara:product:";
const CACHE_TTL = 300; // ۵ دقیقه کش برای سرعت حداکثری

/**
 * گرفتن همه محصولات — با کش Redis
 * @returns {Promise<{success: boolean, products: Array, fromCache?: boolean}>}
 */
export default async function GetCachedProducts() {
  try {
    const cached = await redisGet(ALL_PRODUCTS_CACHE_KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return { success: true, products: cached, fromCache: true };
    }
  } catch (err) {
    // fallback به دیتابیس
  }

  const products = await FindAllProducts_Repo();

  try {
    if (products && products.length > 0) {
      await redisSet(ALL_PRODUCTS_CACHE_KEY, products, CACHE_TTL);
    }
  } catch (err) {
    // ignore
  }

  return { success: true, products, fromCache: false };
}

/**
 * گرفتن یک محصول با آیدی — با کش اختصاصی Redis
 */
export async function GetCachedSingleProduct(id) {
  const cacheKey = `${SINGLE_PRODUCT_PREFIX}${id}`;
  try {
    const cached = await redisGet(cacheKey);
    if (cached && cached._id) {
      return { success: true, product: cached, fromCache: true };
    }
  } catch (err) {}

  const product = await FindProductById_Repo(id);
  if (!product) {
    throw new Error("محصولی با این شناسه یافت نشد");
  }

  try {
    await redisSet(cacheKey, product, CACHE_TTL);
  } catch (err) {}

  return { success: true, product, fromCache: false };
}

/**
 * پاک کردن کش تمام محصولات و محصول تکی
 */
export async function InvalidateProductCache(productId = null) {
  try {
    await redisDel(ALL_PRODUCTS_CACHE_KEY);
    if (productId) {
      await redisDel(`${SINGLE_PRODUCT_PREFIX}${productId}`);
    }
  } catch (err) {}
}
