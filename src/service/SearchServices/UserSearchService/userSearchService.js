import { SearchUser } from "../../../repository/UserRepository/UserRepository.js";

export default async function UserSearchService(keyword) {
  try {
    const queryKeyWord = keyword

    if (!queryKeyWord) {
        throw new Error("چیزی سرچ نشد")
    }

    const searchUser = await SearchUser(queryKeyWord)

    return {success : true , searchUser}
  } catch (error) {
    throw error;
  }
}
