import UserSearchService from "../../../service/SearchServices/UserSearchService/userSearchService.js";

export default async function UserSearchController(req, res) {
  try {
    const searchParam = req.query.q;

    if (!searchParam) {
      return res.status(404).json({
        success: false,
        message: "موردی سرچ نشد",
      });
    }

    const userSearch = await UserSearchService(searchParam);

    return res.status(200).json({
      success: true,
      userSearch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
