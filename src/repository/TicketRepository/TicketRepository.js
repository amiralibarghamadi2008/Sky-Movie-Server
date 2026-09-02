import TicketModel from "../../model/TicketModel/Ticket.js";

export async function createTicketRepo(data) {
  return await TicketModel.create(data);
}

export async function getUserTicketsRepo(userId) {
  return await TicketModel.find({ userId }).sort({ updatedAt: -1 });
}

export async function getAllTicketsRepo() {
  return await TicketModel.find()
    .populate("userId", "firstName phoneNumber avatar role")
    .sort({ updatedAt: -1 });
}

export async function getTicketByIdRepo(ticketId) {
  return await TicketModel.findById(ticketId).populate(
    "userId",
    "firstName phoneNumber avatar role",
  );
}

export async function addMessageToTicketRepo(ticketId, message, status) {
  const update = {
    $push: { messages: message },
  };
  if (status) {
    update.$set = { status };
  }
  return await TicketModel.findByIdAndUpdate(ticketId, update, { new: true });
}

export async function updateTicketStatusRepo(ticketId, status) {
  return await TicketModel.findByIdAndUpdate(
    ticketId,
    { $set: { status } },
    { new: true },
  );
}

export async function updateTicketDataRepo(ticketId, updateData) {
  return await TicketModel.findByIdAndUpdate(
    ticketId,
    { $set: updateData },
    { new: true },
  );
}

export async function deleteTicketRepo(ticketId) {
  return await TicketModel.findByIdAndDelete(ticketId);
}
