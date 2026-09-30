import { DeleteUser } from "../../repository/UserRepository/UserRepository.js";

export default async function DeleteAccountService(userId) {
  try {
    const deleteAccount = await DeleteUser(userId);

    return { success: true, deleteAccount };
  } catch (error) {
    throw error;
  }
}
