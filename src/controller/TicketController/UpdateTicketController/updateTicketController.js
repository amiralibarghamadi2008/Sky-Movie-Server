import UpdateTicketService from "../../../service/TicketServices/UpdateTicketService/updateTicketService.js";

export default async function UpdateTicketController(req, res) {
  try {
    const queryParams = req.params.id;

    const { subject, message } = req.body;

    const updateTicket = await UpdateTicketService(queryParams , { subject, message });

    if (!updateTicket) {
      return res.status(404).json({
        success: false,
        message: "پیدا نشد",
      });
    }

    return res.status(200).json({
      success: false,
      message: "تیکت ویرایش شد",
      updateTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `خطای سرور ${error}`,
    });
  }
}
