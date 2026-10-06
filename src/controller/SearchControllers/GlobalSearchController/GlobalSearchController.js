import GlobalSearchService from "../../../service/SearchServices/GlobalSearchService/globalSearchService.js";

export default async function GlobalSearchController(req, res) {
  try {
    const searchParam = req.query.q;

    if (!searchParam) {
      return res.status(400).json({
        success: false,
        message: "موردی سرچ نشد",
      });
    }

    const globalSearch = await GlobalSearchService(searchParam);

    return res.status(200).json({
      success: true,
      data: globalSearch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
