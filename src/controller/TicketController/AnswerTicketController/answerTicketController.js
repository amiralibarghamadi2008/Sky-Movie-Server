import AnswerTicketService from "../../../service/TicketServices/AnswerTicketService/answerTicketService.js";

export default async function AnswerTicketController(req, res) {
  try {
    const queryParams = req.params.id;

    const { subject, message } = req.body;

    if (!message || !subject) {
      return res.status(400).json({
        success: false,

        message: "فیلد ها اجباری هستش",
      });
    }

    const { findTicket , answerTicket } = await AnswerTicketService(queryParams, { subject, message, user: req.user.userId });

    return res.status(201).json({
      success: true,
      message: "تیکت شما ارسال شد",
      data: {
        findTicket,
        answerTicket,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: `خطای سرور ${error}`,
    });
  }
}
