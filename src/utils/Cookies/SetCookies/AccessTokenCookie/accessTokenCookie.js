export default function AccessTokenCookie (res , accessToken) {
    try {
        res.cookie("accessToken" , accessToken , {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/",
            priority: "high",
            maxAge: 10 * 60 * 1000
        })
    }catch (err) {
        throw new Error (`کوکی نشست نکرد ${err}`)
    }
}