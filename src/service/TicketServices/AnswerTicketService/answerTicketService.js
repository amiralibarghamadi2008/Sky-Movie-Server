import {
  SendTicket,
  UpdateTicket,
} from "../../../repository/TicketRepository/ticketRepository.js";

export default async function AnswerTicketService(ticketId, ticketData) {
  try {
    const findTicket = await UpdateTicket(ticketId, ticketData);

    if (!findTicket) {
      throw new Error("همچین تیکتی پیدا نشد");
    }

    const answerTicket = await SendTicket(ticketData);

    return { findTicket , answerTicket };
  } catch (error) {
    throw error;
  }
}
