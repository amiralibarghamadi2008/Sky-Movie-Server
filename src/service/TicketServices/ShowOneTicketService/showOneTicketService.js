import { FindOneTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function ShowOneTicketService(ticketId) {
  try {
    const findOneTicket = await FindOneTicket(ticketId)

    return findOneTicket
  } catch (error) {
    throw error;
  }
}
