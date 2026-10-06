import TicketSearchService from "../../../service/SearchServices/TicketSearchService/ticketSearchService.js";

export default async function TicketSearchController(req, res) {
  try {
    const searchParam = req.query.q;

    if (!searchParam) {
      return res.status(400).json({
        success: false,
        message: "موردی سرچ نشد",
      });
    }

    const ticketSearch = await TicketSearchService(searchParam);

    return res.status(200).json({
      success: true,
      ticketSearch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
