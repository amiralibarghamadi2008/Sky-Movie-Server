import "dotenv/config"
import jwt from "jsonwebtoken"

export default function VerifyRefreshToken(token) {
    try {
        const decode = jwt.verify(token , process.env.Refresh_Token_Security_Code)

        return decode
    }catch (error) {
        throw error
    }
}