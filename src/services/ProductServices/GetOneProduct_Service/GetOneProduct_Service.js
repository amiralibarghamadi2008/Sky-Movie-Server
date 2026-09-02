import { FindProductById_Repo } from "../../../repository/ProductRepository/ProductRepository.js";

export default async function GetOneProduct_Service(id) {
  try {
    const product = await FindProductById_Repo(id);

    if (!product) {
      throw new Error("محصولی با این شناسه یافت نشد");
    }

    return { success: true, product };
  } catch (error) {
    throw error;
  }
}
