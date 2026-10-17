import UserModel from "../../model/UserModel/user.js";
import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
  FindOneById,
  FindAllForSearch,
} from "../BaseRepository/BaseRepository.js";

export async function FindAllUser() {
  try {
    return await FindAll(UserModel);
  } catch (err) {
    throw err;
  }
}

export async function FindOneUser(userId) {
  try {
    return await FindOne(UserModel, userId);
  } catch (err) {
    throw err;
  }
}

export async function FindOneUserById(userId) {
  try {
    return await FindOneById(UserModel, userId);
  } catch (err) {
    throw err;
  }
}

export async function FindUserByPhone(phoneNumber) {
  try {
    return await FindOne(UserModel, { phoneNumber });
  } catch (err) {
    throw err;
  }
}

export async function CreateUser(userData) {
  try {
    return await Create(UserModel, userData);
  } catch (err) {
    throw err;
  }
}

export async function DeleteUser(userId) {
  try {
    return await Delete(UserModel, userId);
  } catch (err) {
    throw err;
  }
}

export async function UpdateUser(userId, userData) {
  try {
    return await Update(UserModel, userId, userData);
  } catch (err) {
    throw err;
  }
}

export async function SearchUser(keyword) {
  try {
    const filter = { $text: { $search: keyword } };

    const options = {
      select: "firstName",
      limit: 6,
      sort: { score: { $meta: "textScore" } },
    };

    return await FindAllForSearch(UserModel , filter , options)
  } catch (err) {
    throw err;
  }
}
