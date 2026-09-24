import VerifyAccessToken from "../../../utils/tokens/VerifyAccessToken/verifyAccessToken.js";

export default function LoginOnly(req, res, next) {
    try{
        const token = req.cookies?.accessToken

        if (token) {
            const decode = VerifyAccessToken(token)

            if (decode) {
                if (decode.role === "ADMIN") {
                    return res.status(403).json({
                        success : false,
                        message : "شما قبلا لاگین کرده اید ودر نقش ادمین می باشید",
                        redirectTo : "/admin/SkyAdminPanel"
                    })
                }else {
                    return res.status(403).json({
                        success : false,
                        message : "شما قبلا لاگین کرده اید ودر نقش کاربر می باشید",
                        redirectTo : "/user/Panel"
                    })
                }
            }else {
                res.clearCookie("accessToken")
            }
        }else {
            next()
        }
    }catch (error) {
        throw error
    }
}