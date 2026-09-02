import ProductModel from "../../model/ProductModel/ProductModel.js";
import { Create, FindAll, FindOne, Update, Delete } from "../BaceRepository/BaceRepository.js";

export async function CreateProduct_Repo(data) {
  try {
    return await Create(ProductModel, data);
  } catch (error) {
    throw error;
  }
}

export async function FindAllProducts_Repo() {
  try {
    return await FindAll(ProductModel);
  } catch (error) {
    throw error;
  }
}

export async function FindProductById_Repo(id) {
    try {
    return await FindOne(ProductModel, { _id: id });
  } catch (error) {
    throw error;
  }
}

export async function UpdateProduct_Repo(id, data) {
  try {
    return await Update(ProductModel, data, id);
  } catch (error) {
    throw error;
  }
}

export async function AdjustProductPrices_Repo(id, variants) {
  try {
    return await Update(ProductModel, { variants }, id);
  } catch (error) {
    throw error;
  }
}

export async function DeleteProduct_Repo(id) {
  try {
    return await Delete(ProductModel, { _id: id });
  } catch (error) {
    throw error;
  }
}
