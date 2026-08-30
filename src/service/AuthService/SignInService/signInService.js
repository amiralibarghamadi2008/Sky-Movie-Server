import { GetOtpCode , DeleteOtp } from "../../../repository/OtpRepository/OtpRepository.js";
import {FindAllUser, FindUserByPhone, CreateUser} from "../../../repository/UserRepository/UserRepository.js"
import AccessToken from "../../../utils/Tokens/AccessToken/accessToken.js";
import RefreshToken from "../../../utils/Tokens/RefreshToken/refreshToken.js"

export default async function SignInService(userData) {
    try {
        const {phoneNumber , otpCode , firstName} = userData
        const isCurectOtp = await GetOtpCode(phoneNumber)

        if (!isCurectOtp) {
            throw new Error ("کد منقضی شده یا وجود ندارد")
        }else if (isCurectOtp.otpCode !== String(otpCode)) {
            throw new Error ("کد وارد شده اشتباه است") 
        }else {
            let user = await FindUserByPhone(phoneNumber)
            let isNewUser = false
            if (!user) {
                isNewUser = true
                const allUser = await FindAllUser()
                const role = allUser.length > 0 ? "USER" : "ADMIN"
                user = await CreateUser({
                    phoneNumber , role , firstName
                })
            }
            const accessToken = AccessToken(user)
            const refreshToken = RefreshToken(user)
            const deleteOtp = await DeleteOtp(isCurectOtp._id)
            return {accessToken , refreshToken , deleteOtp , user , isNewUser}
        }
    }catch (err) {
        throw err
    }
}