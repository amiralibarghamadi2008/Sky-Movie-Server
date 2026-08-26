import "dotenv/config"
import jwt from "jsonwebtoken"
import crypto from "crypto";


export default async function AccessToken(res , userData) {
    try{
        const accessToken = jwt.sign(
            {userId : userData._id ,firstName : userData.firstName ,userRole : userData.role ,jti : crypto.randomUUID()},
            process.env.Access_Token_Security_Code,
            {expiresIn : "10m"}
        )
    }catch(err){
        throw new Error(`${err.message}`)
    }
}