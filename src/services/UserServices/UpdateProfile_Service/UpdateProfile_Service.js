import { UpdateUser } from "../../../repository/UserRepository/UserRepository.js";

export default async function UpdateProfile_Service(userId, data) {
  try {
    const { firstName, jobTitle, bio, avatar } = data;

    const updateFields = {};
    if (firstName !== undefined) {
      if (!firstName.trim()) throw new Error("نام الزامی است");
      if (firstName.trim().length < 2) throw new Error("نام باید حداقل ۲ حرف باشد");
      updateFields.firstName = firstName.trim();
    }
    if (jobTitle !== undefined) updateFields.jobTitle = jobTitle.trim();
    if (bio !== undefined) updateFields.bio = bio.trim();
    if (avatar !== undefined) updateFields.avatar = avatar.trim();

    const updatedUser = await UpdateUser(userId, updateFields);

    if (!updatedUser) {
      throw new Error("کاربری یافت نشد");
    }

    return {
      success: true,
      message: "پروفایل با موفقیت بروزرسانی شد ✨",
      user: updatedUser,
    };
  } catch (error) {
    throw error;
  }
}
