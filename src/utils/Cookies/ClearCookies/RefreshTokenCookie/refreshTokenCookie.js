export default function ClearRefreshTokenCookie (res) {
    try {
        res.clearCookie("refreshToken" , {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/",
            priority: "high",
            maxAge : 0
        })
    }catch (err) {
        throw new Error (`کوکی پاک نشد ${err}`)
    }
}