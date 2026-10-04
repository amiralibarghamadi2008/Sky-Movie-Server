export default function AdminOnly(req, res, next) {
  try {
    if (req.user?.userRole !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "دسترسی غیرمجاز: این بخش فقط مخصوص ادمین است",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
