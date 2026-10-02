import MakeAdminService from "../../service/MackeAdminService/mackeAdminService.js";

export default async function MackeAdminController(req, res) {
  try {
    const queryPrams = req.params.id;

    const { role } = req.body;

    const roleChange = await MakeAdminService(queryPrams, { role });

    return res.status(200).json(roleChange);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
