import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function RefreshToken(res , userData) {
    try {
        const refreshToken = jwt.sign(
            {userId : userData._id ,firstName : userData.firstName ,userRole : userData.role ,jti : crypto.randomUUID()},
            process.env.Access_Token_Security_Code,
            {expiresIn : "20d"}
        )
    }catch (err) {
        throw new Error(`خطای رفرش توکن : ${err}`)
    }
}