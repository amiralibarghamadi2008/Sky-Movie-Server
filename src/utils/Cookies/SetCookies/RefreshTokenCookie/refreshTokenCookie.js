export default function RefreshTokenCookie (res , refreshToken) {
    try {
        res.cookie("refreshToken" , refreshToken , {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/",
            priority: "high",
            maxAge: 20 * 24 * 60 * 60 * 1000
        })
    }catch (err) {
        throw new Error (`کوکی نشست نکرد ${err}`)
    }
}