import { UpdateUser } from "../../../repository/UserRepository/UserRepository.js";

export default async function UpdateName_Service(userId, data) {
  try {
    const { firstName } = data;

    if (!firstName || !firstName.trim()) {
      throw new Error("نام الزامی است");
    }
    if (firstName.trim().length < 2) {
      throw new Error("نام باید حداقل ۲ حرف باشد");
    }

    const updatedUser = await UpdateUser(userId, { firstName: firstName.trim() });

    if (!updatedUser) {
      throw new Error("کاربری یافت نشد");
    }

    return {
      success: true,
      message: "نام با موفقیت ذخیره شد",
      user: updatedUser,
    };
  } catch (error) {
    throw error;
  }
}
