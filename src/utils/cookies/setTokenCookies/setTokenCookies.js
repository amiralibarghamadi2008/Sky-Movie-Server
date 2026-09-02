export default function SetTokenCookies(res, accessToken, refreshToken) {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 20 * 60 * 1000,
      priority: "high",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
      priority: "high",
    });
  } catch (error) {
    throw error;
  }
}
