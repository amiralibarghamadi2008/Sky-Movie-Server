import { UpdateUser } from "../../repository/UserRepository/UserRepository.js";

export default async function MakeAdminService(userId, { role }) {
  try {
    const roleChange = await UpdateUser(userId, { role });

    return { success: true, roleChange };
  } catch (error) {
    throw error;
  }
}
