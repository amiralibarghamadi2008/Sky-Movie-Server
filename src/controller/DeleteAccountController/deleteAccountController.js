import DeleteAccountService from "../../service/DeleteAccountService/deleteAccountService.js";

export default async function DeleteAccountController(req, res) {
  try {
    const queryParams = req.params.id;

    const deleteAccount = await DeleteAccountService(queryParams);

    return res.status(200).json(deleteAccount);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
