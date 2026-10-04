import { DeleteTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function DeleteTicketService(ticketId) {
  try {
    const deleteTicket = await DeleteTicket(ticketId);

    return deleteTicket;
  } catch (error) {
    throw error;
  }
}
