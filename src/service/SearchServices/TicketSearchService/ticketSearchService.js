import { SearchTicket } from "../../../repository/TicketRepository/ticketRepository.js";

export default async function TicketSearchService(keyword) {
  try {
    const queryKeyWord = keyword;

    if (!queryKeyWord) {
      throw new Error("موردی برای سرچ کردن وارد نشده است");
    }

    const searchTicket = await SearchTicket(queryKeyWord);

    return { success: true, searchTicket };
  } catch (error) {
    throw error;
  }
}
