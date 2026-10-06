import { FindAllTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function ShowTicketService() {
  try {
    const findAll = await FindAllTicket()

    return findAll
  } catch (error) {
    throw error;
  }
}
