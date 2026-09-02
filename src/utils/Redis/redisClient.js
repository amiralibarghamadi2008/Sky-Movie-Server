/**
 * redisClient.js — اتصال امن به Redis با fallback خودکار
 *
 * ⭐ اصل مهم: Redis یک «بهینه‌سازی» است، نه وابستگی.
 *    اگه Redis در دسترس نباشه، صفر خطا — همه‌چیز مثل قبل کار می‌کنه.
 *
 * الگو: طبق ساختار utils/ پروژه
 */

import { createClient } from "redis";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

// آدرس Redis از env (پیش‌فرض: نام کانتینر در شبکه داکر)
const REDIS_URL = process.env.REDIS_URL || "redis://mavara_redis:6379";

let client = null;
let ready = false;
let connecting = false;

/**
 * ایجاد کلاینت Redis (با مدیریت خطا و fallback)
 */
async function connectRedis() {
  if (ready || connecting) return;

  connecting = true;
  try {
    client = createClient({ url: REDIS_URL, socket: { connectTimeout: 3000 } });

    client.on("error", (err) => {
      // فقط لاگ — هیچ خطایی به بیرون نمیره
      logger.warn({ err: err.message }, "⚠️ Redis error (fallback active)");
      ready = false;
    });

    client.on("ready", () => {
      logger.info("✅ Redis connected");
      ready = true;
    });

    client.on("end", () => {
      ready = false;
    });

    await client.connect();
    ready = true;
  } catch (err) {
    logger.warn(
      { err: err.message },
      "⚠️ Redis unavailable — continuing without cache. سیستم مثل قبل کار می‌کند.",
    );
    ready = false;
  } finally {
    connecting = false;
  }

  return client;
}

/**
 * آیا Redis آماده‌ست؟
 * @returns {boolean}
 */
export function isRedisReady() {
  return ready && client?.isReady;
}

/**
 * گرفتن کلاینت (برای استفاده در سرویس‌ها)
 * @returns {object|null} کلاینت redis یا null اگه در دسترس نباشه
 */
export function getRedis() {
  return isRedisReady() ? client : null;
}

/**
 * ست کردن مقدار با TTL — امن (اگه Redis نباشه، صفر خطا)
 */
export async function redisSet(key, value, ttlSeconds) {
  try {
    if (!isRedisReady()) return false;
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
    return true;
  } catch (err) {
    logger.warn({ err: err.message }, "Redis set failed (skipped)");
    return false;
  }
}

/**
 * گرفتن مقدار — امن (اگه Redis نباشه null)
 */
export async function redisGet(key) {
  try {
    if (!isRedisReady()) return null;
    const raw = await client.get(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    logger.warn({ err: err.message }, "Redis get failed (skipped)");
    return null;
  }
}

/**
 * حذف کلید — امن
 */
export async function redisDel(key) {
  try {
    if (!isRedisReady()) return false;
    await client.del(key);
    return true;
  } catch (err) {
    return false;
  }
}

// اتصال اولیه (غیرمسدودکننده — بک‌اند بدون Redis هم بالا میاد)
connectRedis();

export default { isRedisReady, getRedis, redisSet, redisGet, redisDel };