import TicketModel from "../../model/TicketModel/ticket.js";
import { Create, FindOneById, FindAll } from "../BaseRepository/BaseRepository.js";

export async function SendTicket(ticketData) {
  try {
    return await Create(TicketModel , ticketData)
  } catch (error) {
    throw error;
  }
}

export async function FindTicket(ticketId) {
  try {
    return await FindOneById(TicketModel , ticketId)
  } catch (error) {
    throw error;
  }
}

export async function FindAllTicket() {
  try {
    return await FindAll(TicketModel)
  } catch (error) {
    throw error;
  }
}