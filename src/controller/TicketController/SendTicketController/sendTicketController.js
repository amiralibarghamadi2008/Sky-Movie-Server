import SendTicketService from "../../../service/TicketServices/SendTicketService/sendTicketService.js";

export default async function SendTicketController(req, res) {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json("متن و موضوع تیکت اجباری هستش");
    }

    const sendTicket = await SendTicketService({
      subject,
      message,
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "تیکت شما ارسال شد",
      sendTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
