import OtpModel from "../../model/OtpModel/otp.js"
import {FindOne, Create , Delete} from "../BaceRepository/BaceRepository.js"

export async function GetOtpCode(phoneNumber) {
    try{
        return await FindOne(OtpModel , {phoneNumber} , { sort: { createdAt: -1 } })
    }catch (err) {
        throw err
    }
}

export async function SendOtp(phoneNumber , otpCode) {
    try{
        return await Create(OtpModel , {phoneNumber , otpCode})
    }catch (err) {
        throw err
    }
}

export async function DeleteOtp(otpCode) {
    try{
        return await Delete(OtpModel , otpCode)
    }catch (err) {
        throw err
    }
}