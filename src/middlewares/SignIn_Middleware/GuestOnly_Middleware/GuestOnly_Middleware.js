import verifyAccessToken from "../../../utils/token/verifyAccessToken/verifyAccessToken.js";

export default function GuestOnly_Middleware(req, res, next) {
  // گرفتن توکن مستقیماً از کوکی‌های کلاینت
  const token = req.cookies?.accessToken;

  if (token) {
    const decoded = verifyAccessToken(token);
    
    if (decoded) {
      if (decoded.role === 'ADMIN') {
         return res.status(403).json({ 
           success: false, 
           message: "شما قبلاً لاگین کرده‌اید و ادمین هستید.", 
           redirectTo: "/admin/dashboard" 
         });
      } else {
         return res.status(403).json({ 
           success: false, 
           message: "شما قبلاً لاگین کرده‌اید.", 
           redirectTo: "/user/dashboard"
         });
      }
    } else {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
    }
  }

  next();
}