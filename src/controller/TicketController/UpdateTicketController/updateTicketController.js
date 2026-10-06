import mongoose from "mongoose";
import UpdateTicketService from "../../../service/TicketServices/UpdateTicketService/updateTicketService.js";
import { validateUpdateTicket } from "../../../validator/TicketValidator/ticketValidator.js";

export default async function UpdateTicketController(req, res) {
  try {

    const checkResult = validateUpdateTicket(req.body);

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

    const queryParams = req.params.id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

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
