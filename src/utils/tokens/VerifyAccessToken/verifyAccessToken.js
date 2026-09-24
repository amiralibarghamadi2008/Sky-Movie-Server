import "dotenv/config"
import jwt from "jsonwebtoken"

export default function VerifyAccessToken(token) {
    try {
        const decode = jwt.verify(token , process.env.Access_Token_Security_Code)

        return decode
    }catch (error) {
        throw error
    }
}