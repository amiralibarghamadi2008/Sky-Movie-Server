import { FindAllProducts_Repo } from "../../../repository/ProductRepository/ProductRepository.js";

export default async function GetAllProducts_Service() {
  try {
    const products = await FindAllProducts_Repo();
    return { success: true, products };
  } catch (error) {
    throw error;
  }
}