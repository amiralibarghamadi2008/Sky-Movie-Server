import { FindOneUser } from "../../repository/UserRepository/UserRepository.js";

export default async function GetMeService(userId) {
    try {
        const user = await FindOneUser(userId)

        if (user) {
            return {
                firstName : user.firstName,
                phoneNumber : user.phoneNumber,
                role : user.role,
                movieBookmark : user.movieBookmark,
                seriesBookmark : user.seriesBookmark,
                Avatar : user.Avatar
            }
        }else {
            throw new Error("کاربری با این مشخصات یافت نشد")
        }
    }catch (error) {
        throw error
    }
}