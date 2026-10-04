import { UpdateTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function UpdateTicketService(ticketId , ticketData) {
  try {
    const updateTicket = await UpdateTicket(ticketId , ticketData);

    return updateTicket;
  } catch (error) {
    throw error;
  }
}
