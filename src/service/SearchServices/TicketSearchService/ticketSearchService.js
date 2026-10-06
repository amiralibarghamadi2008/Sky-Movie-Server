import { SearchTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function TicketSearchService(slug) {
  try {
    const querySlug = slug;

    if (!querySlug) {
      throw new Error("موردی برای سرچ کردن وارد نشده است");
    }

    const searchTicket = await SearchTicket(querySlug);

    return { success: true, searchTicket };
  } catch (error) {
    throw error;
  }
}
