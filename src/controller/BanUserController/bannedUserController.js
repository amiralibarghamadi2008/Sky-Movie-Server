import BannedUserService from "../../service/BannedUserService/bannedUserService.js";

export default async function BannedUserController(req, res) {
  try {
    const queryParams = req.params.id;

    const { isBanned } = req.body;

    const bannedUser = await BannedUserService(queryParams, { isBanned });

    res.status(200).json({
        success : true, 
        message : "کاربر بن شد",
        bannedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
