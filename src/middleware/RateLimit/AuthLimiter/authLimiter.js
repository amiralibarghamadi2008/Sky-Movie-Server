import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message:
      "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً 2 دقیقه دیگر تلاش کنید.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

export default authLimiter