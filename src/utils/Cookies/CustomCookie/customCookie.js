export default function CustomCookie(res, rateLimit) {
  try {
    res.cookie("customCookie", rateLimit, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      priority: "high",
      maxAge: 10 * 60 * 1000,
    });
  } catch (error) {
    throw new Error(`کوکی نشست نکرد${error}`);
  }
}
