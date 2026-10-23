import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redis from "../../../config/redis/redis.js";
import CustomCookie from "../../../utils/Cookies/CustomCookie/customCookie.js";
import crypto from "node:crypto";

const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
    prefix: "rate-limit:auth:",
  }),
  windowMs: 5 * 60 * 1000,
  max: 5,
  keyGenerator: function CustomIP(req, res) {
    const getIP = ipKeyGenerator(req);

    const phoneNumber = req.body.phoneNumber || ""

    const cookie = req.cookies.customCookie;

    if (!cookie) {
      const randomValue = crypto.randomInt(10000, 100000).toString();

      CustomCookie(res, randomValue);

      const customIp = getIP + randomValue + phoneNumber;

      const parseGenrateCookie = customIp.toString();

      return parseGenrateCookie;
    }

    const customIpWithExistingCookie = getIP + cookie + phoneNumber;

    const parseCookie = customIpWithExistingCookie.toString();

    return parseCookie;
  },
  message: {
    success: false,
    status : 429,
    message:
      "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً 5 دقیقه دیگر تلاش کنید.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default authLimiter;
