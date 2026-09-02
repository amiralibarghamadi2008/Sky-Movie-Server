import { DeleteProduct_Repo } from "../../../repository/ProductRepository/ProductRepository.js";

export default async function DeleteProduct_Service(id) {
  try {
    const deletedProduct = await DeleteProduct_Repo(id);

    if (!deletedProduct) {
      throw new Error("محصولی جهت حذف یافت نشد");
    }

    return { success: true, message: "محصول با موفقیت حذف شد" };
  } catch (error) {
    throw error;
  }
}
