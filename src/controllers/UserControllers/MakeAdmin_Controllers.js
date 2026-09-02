import MakeAdmin_Services from "../../services/UserServices/MakeAdmin_Services.js";

export default async function MakeAdmin_Controllers(req, res) {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ success: false, message: "ارسال فیلد role الزامی است" });
    }

    const result = await MakeAdmin_Services(userId, role);
    
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
}