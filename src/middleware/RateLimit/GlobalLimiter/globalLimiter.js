import rateLimit from "express-rate-limit";

const GlobalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 150,
  message: {
    success: false,
    message:
      "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً 10 دقیقه دیگر تلاش کنید.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

export default GlobalLimiter