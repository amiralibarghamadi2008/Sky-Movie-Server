import UpdateProfile_Service from "../../../services/UserServices/UpdateProfile_Service/UpdateProfile_Service.js";

export default async function UpdateProfile_Controller(req, res) {
  try {
    const { firstName, jobTitle, bio, avatar } = req.body;
    const userId = req.user.id || req.user._id;

    const result = await UpdateProfile_Service(userId, { firstName, jobTitle, bio, avatar });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
