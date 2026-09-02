import UserModel from "../../model/UsersModel/user.js";
import { FindAll, FindOne, Create, Update } from "../BaceRepository/BaceRepository.js";

export async function FindAllUsers() {
  try {
    return await FindAll(UserModel);
  } catch (error) {
    throw error;
  }
}

export async function findUserById(userId) {
  try {
    return await FindOne(UserModel, { _id: userId });
  } catch (error) {
    throw error;
  }
}

export async function findUserByPhone(phoneNumber) {
  try {
    return await FindOne(UserModel, { phoneNumber });
  } catch (error) {
    throw error;
  }
}

export async function CreateUser(userData) {
  try {
    return await Create(UserModel, userData);
  } catch (error) {
    throw error;
  }
}

export async function DeleteUser(userId) {
  try {
    // استفاده مستقیم و ایمن از findByIdAndDelete برای جلوگیری از تطابق اشتباه فیلتر
    return await UserModel.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
}

export async function UpdateUser(id, data) {
  try {
    return await Update(UserModel, data, id);
  } catch (error) {
    throw error;
  }
}
