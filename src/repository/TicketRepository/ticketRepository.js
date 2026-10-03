import TicketModel from "../../model/TicketModel/ticket.js";
import { FindOne, Create } from "../BaseRepository/BaseRepository.js";

export async function SendTicket(ticketData) {
  try {
    return await Create(TicketModel , ticketData)
  } catch (error) {
    throw error;
  }
}

export async function FindTicket(ticketId) {
  try {
    return await FindOne(TicketModel , ticketId)
  } catch (error) {
    throw error;
  }
}
