import { UpdateUser, findUserById } from "../../repository/UserRepository/UserRepository.js";

const PROTECTED_PHONES = ["09104477731"];

export default async function MakeAdmin_Services(id, role) {
  try {
    const targetUser = await findUserById(id);

    if (!targetUser) {
      throw new Error("کاربری جهت تغییر سطح دسترسی یافت نشد");
    }

    // قفل امنیتی: شماره‌های مدیر ارشد به هیچ وجه امکان تغییر نقش ندارند
    if (PROTECTED_PHONES.includes(targetUser.phoneNumber)) {
      throw new Error("تغییر نقش این حساب کاربری (مدیر ارشد) مسدود و غیرقابل تغییر است!");
    }

    const updatedUser = await UpdateUser(id, { role });

    return {
      success: true,
      message: "سطح دسترسی کاربر با موفقیت بروزرسانی شد",
      user: updatedUser,
    };
  } catch (error) {
    throw error;
  }
}
