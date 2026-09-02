import { checkUser } from "../../Validator/AuthValidator/sign-in.js";

export default async function UserValidator(req, res, next) {
  try {
    const data = req.body;

    const result = checkUser(data);

    if (result !== true) {
      return res.status(422).json(result);
    } else {
      next()
    }
  } catch (error) {
    throw error;
  }
}
