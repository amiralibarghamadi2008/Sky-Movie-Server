import OtpModel from "../../model/OtpModel/otp.js"
import {FindAll, FindOne} from "../BaceRepository/BaceRepository.js"

export async function FindOneOtpCode(phoneNumber) {
    try{
        return await FindOne(OtpModel , {phoneNumber} , { sort: { createdAt: -1 } })
    }catch (err) {
        throw err
    }
}

export async function SaveOtp(phoneNumber , otpCode) {
    try{
        return await Create(OtpModel , {phoneNumber , otpCode})
    }catch (err) {
        throw err
    }
}