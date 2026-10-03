import { FindOneUser, UpdateUser } from "../../repository/UserRepository/UserRepository.js";

export default async function BannedUserService(userId , userData) {
  try {
    const findUser = await FindOneUser(userId)

    if (!findUser) {
        throw new Error("همچین کاربری وجود ندارد")
    }

    const updateUserStatus = await UpdateUser(userId , userData)

    const banned = updateUserStatus.isBanned === true

    return banned
  } catch (error) {
    throw error;
  }
}
