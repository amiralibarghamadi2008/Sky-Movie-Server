import mongoose from "mongoose";
import ShowOneTicketService from "../../../service/TicketServices/ShowOneTicketService/showOneTicketService.js";

export default async function ShowOneTicketController(req, res) {
  try {
    const queryParams = req.params.id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const findOneTicket = await ShowOneTicketService(queryParams);

    if (!findOneTicket) {
      return res.status(404).json({
        success: true,
        message: "پیدا نشد",
      });
    }

    return res.status(200).json({
      success: true,
      findOneTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `خطای سرور ${error}`,
    });
  }
}
