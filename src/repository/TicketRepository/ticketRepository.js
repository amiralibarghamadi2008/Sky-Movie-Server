import TicketModel from "../../model/TicketModel/ticket.js";
import {
  FindOneById,
  FindAll,
  Create,
  Update,
  Delete,
  FindAllForSearch,
} from "../BaseRepository/BaseRepository.js";

export async function FindAllTicket() {
  try {
    return await FindAll(TicketModel);
  } catch (error) {
    throw error;
  }
}

export async function FindOneTicket(ticketId) {
  try {
    return await FindOneById(TicketModel, ticketId);
  } catch (error) {
    throw error;
  }
}

export async function SendTicket(ticketData) {
  try {
    return await Create(TicketModel, ticketData);
  } catch (error) {
    throw error;
  }
}

export async function DeleteTicket(ticketData) {
  try {
    return await Delete(TicketModel, ticketData);
  } catch (error) {
    throw error;
  }
}

export async function UpdateTicket(ticketId, ticketData) {
  try {
    return await Update(TicketModel, ticketId, ticketData);
  } catch (err) {
    throw err;
  }
}

export async function SearchTicket(ticketSlug) {
  try {
    return await FindAllForSearch(TicketModel, ticketSlug);
  } catch (error) {
    throw error;
  }
}
