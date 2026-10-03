import { SendTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function SendTicketService(ticketData) {
  try {
    const sendTicket = await SendTicket(ticketData);

    return sendTicket;
  } catch (error) {
    throw error;
  }
}
