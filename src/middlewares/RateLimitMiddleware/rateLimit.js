import rateLimit from "express-rate-limit";
import { isRedisReady, getRedis } from "../../utils/Redis/redisClient.js";

/**
 * rateLimit.js — محدودیت نرخ درخواست‌ها
 *
 * ⭐ با Redis: محدودیت‌ها بین همه‌ی instanceها مشترک می‌شن (قوی‌تر)
 * ⭐ بدون Redis: همون in-memory قبلی (fallback — مثل قبل کار می‌کنه)
 */

const generateKey = (req) => {
  // Use phoneNumber from body as key (per-user rate limiting)
  // Prevents different users behind same IP from blocking each other
  const phone = req.body?.phoneNumber;
  if (phone) return `phone:${phone}`;
  
  // Fall back to forwarded IP (behind Nginx proxy)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim();
    return `ip:${ip}`;
  }
  
  const ip = req.connection?.remoteAddress || "unknown";
  // Strip IPv6 prefix if present
  const cleanIp = ip?.replace(/^::ffff:/, '') || "unknown";
  return `ip:${cleanIp}`;
};

// ─── Redis store (اختیاری — اگه Redis نبود null میمونه) ───
let redisStore = null;
if (typeof window === "undefined" && isRedisReady()) {
  try {
    const { RedisStore } = await import("rate-limit-redis");
    redisStore = new RedisStore({
      sendCommand: (...args) => getRedis().sendCommand(args),
    });
  } catch (err) {
    // Redis store در دسترس نیست — in-memory استفاده می‌شه
    redisStore = null;
  }
}

// اگه Redis بعداً وصل شد، store بساز
import { createClient } from "redis";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

async function ensureRedisStore() {
  if (redisStore) return redisStore;
  if (!isRedisReady()) return null;
  try {
    const { RedisStore } = await import("rate-limit-redis");
    redisStore = new RedisStore({
      sendCommand: (...args) => getRedis().sendCommand(args),
    });
    logger.info("✅ Rate limit Redis store فعال شد");
    return redisStore;
  } catch (err) {
    return null;
  }
}

export const smsLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 3, 
  keyGenerator: generateKey,
  store: await ensureRedisStore() || undefined,
  message: {
    success: false,
    message: "کد تایید قبلاً ارسال شده است. لطفاً ۲ دقیقه دیگر تلاش کنید.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 7,
  keyGenerator: generateKey,
  store: await ensureRedisStore() || undefined,
  message: {
    success: false,
    message: "بیش از حد مجاز تلاش کرده‌اید. لطفاً ۱۵ دقیقه دیگر مجدداً تلاش کنید.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});