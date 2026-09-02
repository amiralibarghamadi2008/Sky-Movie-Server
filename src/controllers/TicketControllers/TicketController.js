import {
  createTicketService,
  getUserTicketsService,
  getAllTicketsService,
  getTicketByIdService,
  replyTicketService,
  updateTicketStatusService,
  updateTicketService,
  deleteTicketService,
} from "../../services/TicketServices/TicketService.js";

export async function createTicketController(req, res) {
  try {
    const result = await createTicketService(req.user, req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function getUserTicketsController(req, res) {
  try {
    const result = await getUserTicketsService(req.user);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAllTicketsController(req, res) {
  try {
    const result = await getAllTicketsService(req.user);
    return res.status(200).json(result);
  } catch (error) {
    let code = 400;
    if (error.message.includes("غیرمجاز")) code = 403;
    return res.status(code).json({ success: false, message: error.message });
  }
}

export async function getTicketByIdController(req, res) {
  try {
    const result = await getTicketByIdService(req.user, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    let code = 400;
    if (error.message.includes("غیرمجاز")) code = 403;
    if (error.message.includes("یافت نشد")) code = 404;
    return res.status(code).json({ success: false, message: error.message });
  }
}

export async function replyTicketController(req, res) {
  try {
    const result = await replyTicketService(req.user, req.params.id, req.body.text);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateTicketStatusController(req, res) {
  try {
    const result = await updateTicketStatusService(req.user, req.params.id, req.body.status);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateTicketController(req, res) {
  try {
    const result = await updateTicketService(req.user, req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    let code = 400;
    if (error.message.includes("غیرمجاز")) code = 403;
    return res.status(code).json({ success: false, message: error.message });
  }
}

export async function deleteTicketController(req, res) {
  try {
    const result = await deleteTicketService(req.user, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    let code = 400;
    if (error.message.includes("غیرمجاز")) code = 403;
    return res.status(code).json({ success: false, message: error.message });
  }
}
