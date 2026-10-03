export default function ClearAccessTokenCookie (res) {
    try {
        res.clearCookie("accessToken" , {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/",
            priority: "high",
            maxAge : 0
        })
    }catch (error) {
        throw new Error (`کوکی پاک نشد ${error}`)
    }
}