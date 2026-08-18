import UserModel from "../../model/UserModel/user.js"
import {FindAll, FindOne, Create, Delete, Update} from "../BaceRepository/BaceRepository.js"

export async function FindAllUser() {
    try{
        return await FindAll(UserModel)
    }catch (err) {
        throw err
    }
}

export async function FindOneUser(userId) {
    try{
        return await FindOne(UserModel , userId)
    }catch (err) {
        throw err
    }
}

export async function FindUserByPhone(phoneNumber) {
    try{
        return await FindOne(UserModel , {phoneNumber})
    }catch (err) {
        throw err
    }
}

export async function CreateUser (userData) {
    try{
        return await Create(UserModel , userData)
    }catch (err) {
        throw err
    }
}

export async function DeleteUser (userId) {
    try{
        return await Delete(UserModel , userId)
    }catch (err) {
        throw err
    }
}

export async function UpdateUser (userId , userData) {
    try{
        return await Delete(UserModel , userId , userData)
    }catch (err) {
        throw err
    }
}