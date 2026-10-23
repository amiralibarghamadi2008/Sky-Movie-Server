import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redis from "../../../config/redis/redis.js";
import CustomCookie from "../../../utils/Cookies/CustomCookie/customCookie.js";
import crypto from "node:crypto";

const GlobalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
    prefix: "rate-limit:global:",
  }),
  windowMs: 3 * 60 * 1000,
  max: 150,
  keyGenerator: function CustomIP(req, res) {
    const getIP = ipKeyGenerator(req);

    const cookie = req.cookies.customCookie;

    if (!cookie) {
      const randomValue = crypto.randomInt(10000, 100000).toString();

      CustomCookie(res, randomValue);

      const customIp = getIP + randomValue;

      const parseGenrateCookie = customIp.toString();

      return parseGenrateCookie;
    }

    const customIpWithExistingCookie = getIP + cookie;

    const parseCookie = customIpWithExistingCookie.toString();

    return parseCookie;
  },
  message: {
    success: false,
    status: 429,
    message:
      "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً 3 دقیقه دیگر تلاش کنید.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default GlobalLimiter;
