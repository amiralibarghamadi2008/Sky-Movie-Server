import SendTicketService from "../../../service/TicketServices/SendTicketService/sendTicketService.js";
import { validateSendTicket } from "../../../validator/TicketValidator/ticketValidator.js";

export default async function SendTicketController(req, res) {
  try {

    const checkResult = validateSendTicket(req.body);

    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json("متن و موضوع تیکت اجباری هستش");
    }

    const sendTicket = await SendTicketService({
      subject,
      message,
      user: req.user.userId,
    });

    return res.status(201).json({
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
