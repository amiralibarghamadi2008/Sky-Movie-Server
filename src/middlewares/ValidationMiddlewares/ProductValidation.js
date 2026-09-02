import validateProduct from "../../Validator/ProductValidator/ProductValidator.js";

export default async function ProductValidator(req, res, next) {
  try {
    const data = req.body;

    const result = validateProduct(data);

    if (result !== true) {
      return res.status(422).json(result);
    } else {
      next()
    }
  } catch (error) {
    throw error;
  }
}
