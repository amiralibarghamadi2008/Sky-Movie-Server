import { findUserById } from "../../repository/UserRepository/UserRepository.js";

export default async function GetMe_Services(userId) {
  try {
    const user = await findUserById(userId);
    
    if (!user) {
      throw new Error("کاربری با این مشخصات یافت نشد.");
    }

    return {
      _id: user._id,
      firstName: user.firstName || "",
      role: user.role,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar || "",
      jobTitle: user.jobTitle || "",
      bio: user.bio || ""
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
