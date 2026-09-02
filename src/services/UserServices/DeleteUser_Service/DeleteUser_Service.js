import { DeleteUser, findUserById } from "../../../repository/UserRepository/UserRepository.js";

const PROTECTED_PHONES = ["09104477731"];

export default async function DeleteUser_Service(userId, currentUser) {
  try {
    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new Error("دسترسی غیرمجاز! فقط مدیر کل می‌تواند کاربر را حذف کند.");
    }

    const currentUserIdStr = (currentUser.id || currentUser._id)?.toString();
    if (currentUserIdStr === userId?.toString()) {
      throw new Error("شما نمی‌توانید حساب کاربری خودتان را حذف کنید!");
    }

    const existingUser = await findUserById(userId);
    if (!existingUser) {
      throw new Error("کاربر مورد نظر یافت نشد.");
    }

    // قفل ایمنی برای شماره مدیر اصلی
    if (PROTECTED_PHONES.includes(existingUser.phoneNumber)) {
      throw new Error("حساب کاربری مدیر اصلی غیرقابل حذف است!");
    }

    await DeleteUser(userId);
    return { success: true, message: "کاربر با موفقیت حذف شد." };
  } catch (error) {
    throw error;
  }
}
