import DeleteTicketService from "../../../service/TicketServices/DeleteTicketService/deleteTicketService.js";

export default async function DeleteTicketController(req, res) {
  try {
    const queryParams = req.params.id;

    const deleteTicket = await DeleteTicketService(queryParams);

    if (!deleteTicket) {
      return res.status(404).json({
        success: false,
        message: "پیدا نشد",
      });
    }

    return res.status(200).json({
      success: false,
      message: "تیکت حذف شد",
      deleteTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `خطای سرور ${error}`,
    });
  }
}
