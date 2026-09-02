import { CreateProduct_Repo } from "../../../repository/ProductRepository/ProductRepository.js";

export default async function CreateProduct_Service(data) {
  try {
    const product = await CreateProduct_Repo(data);
    return { success: true, message: "محصول با موفقیت اضافه شد", product };
  } catch (error) {
    throw error;
  }
}
