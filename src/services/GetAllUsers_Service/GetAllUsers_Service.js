import { FindAllUsers } from "../../repository/UserRepository/UserRepository.js";

export default async function GetAllUsers_Service() {
  try {
    const users = await FindAllUsers();
    return { success: true, users };
  } catch (error) {
    throw error;
  }
}