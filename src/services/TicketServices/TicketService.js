import {
  createTicketRepo,
  getUserTicketsRepo,
  getAllTicketsRepo,
  getTicketByIdRepo,
  addMessageToTicketRepo,
  updateTicketStatusRepo,
  updateTicketDataRepo,
  deleteTicketRepo,
} from "../../repository/TicketRepository/TicketRepository.js";

export async function createTicketService(user, data) {
  const { subject, message, priority } = data;
  if (!subject || !subject.trim()) {
    throw new Error("موضوع پیام الزامی است");
  }
  if (!message || !message.trim()) {
    throw new Error("متن پیام الزامی است");
  }

  const userId = user.id || user._id;
  const newTicket = await createTicketRepo({
    userId,
    subject: subject.trim(),
    priority: priority || "MEDIUM",
    status: "PENDING",
    messages: [
      {
        senderId: userId,
        senderName: user.firstName || "کاربر",
        senderRole: user.role || "USER",
        text: message.trim(),
      },
    ],
  });

  return { success: true, message: "تیکت با موفقیت ثبت شد", ticket: newTicket };
}

export async function getUserTicketsService(user) {
  const userId = user.id || user._id;
  const tickets = await getUserTicketsRepo(userId);
  return { success: true, tickets };
}

export async function getAllTicketsService(user) {
  if (user.role !== "ADMIN") {
    throw new Error("دسترسی غیرمجاز! فقط مدیر کل می‌تواند تیکت‌ها را ببیند.");
  }
  const tickets = await getAllTicketsRepo();
  return { success: true, tickets };
}

export async function getTicketByIdService(user, ticketId) {
  const ticket = await getTicketByIdRepo(ticketId);
  if (!ticket) {
    throw new Error("تیکت مورد نظر یافت نشد");
  }
  const userId = (user.id || user._id)?.toString();
  if (user.role !== "ADMIN" && ticket.userId?._id?.toString() !== userId && ticket.userId?.toString() !== userId) {
    throw new Error("دسترسی غیرمجاز به این تیکت");
  }
  return { success: true, ticket };
}

export async function replyTicketService(user, ticketId, text) {
  if (!text || !text.trim()) {
    throw new Error("متن پاسخ الزامی است");
  }
  const ticket = await getTicketByIdRepo(ticketId);
  if (!ticket) {
    throw new Error("تیکت مورد نظر یافت نشد");
  }
  if (ticket.status === "CLOSED") {
    throw new Error("این تیکت بسته شده است و امکان ارسال پاسخ وجود ندارد.");
  }

  const userId = user.id || user._id;
  const isAdmin = user.role === "ADMIN";
  const newStatus = isAdmin ? "ANSWERED" : "PENDING";

  const messageObj = {
    senderId: userId,
    senderName: user.firstName || (isAdmin ? "مدیر سامانه" : "کاربر"),
    senderRole: user.role || "USER",
    text: text.trim(),
  };

  const updatedTicket = await addMessageToTicketRepo(ticketId, messageObj, newStatus);
  return { success: true, message: "پاسخ با موفقیت ارسال شد", ticket: updatedTicket };
}

export async function updateTicketStatusService(user, ticketId, status) {
  if (!["PENDING", "ANSWERED", "CLOSED"].includes(status)) {
    throw new Error("وضعیت نامعتبر است");
  }
  const updated = await updateTicketStatusRepo(ticketId, status);
  return { success: true, message: "وضعیت تیکت تغییر یافت", ticket: updated };
}

export async function updateTicketService(user, ticketId, data) {
  const ticket = await getTicketByIdRepo(ticketId);
  if (!ticket) {
    throw new Error("تیکت مورد نظر یافت نشد");
  }

  const userId = (user.id || user._id)?.toString();
  const isAdmin = user.role === "ADMIN";
  const isOwner = ticket.userId?._id?.toString() === userId || ticket.userId?.toString() === userId;

  if (!isAdmin && !isOwner) {
    throw new Error("دسترسی غیرمجاز برای ویرایش این تیکت");
  }

  const updateFields = {};
  if (data.subject !== undefined) {
    if (!data.subject.trim()) throw new Error("موضوع تیکت الزامی است");
    updateFields.subject = data.subject.trim();
  }
  if (data.priority !== undefined) {
    if (!["LOW", "MEDIUM", "HIGH"].includes(data.priority)) throw new Error("اولویت نامعتبر است");
    updateFields.priority = data.priority;
  }

  const updated = await updateTicketDataRepo(ticketId, updateFields);
  return { success: true, message: "تیکت با موفقیت ویرایش شد", ticket: updated };
}

export async function deleteTicketService(user, ticketId) {
  const ticket = await getTicketByIdRepo(ticketId);
  if (!ticket) {
    throw new Error("تیکت مورد نظر یافت نشد");
  }

  const userId = (user.id || user._id)?.toString();
  const isAdmin = user.role === "ADMIN";
  const isOwner = ticket.userId?._id?.toString() === userId || ticket.userId?.toString() === userId;

  if (!isAdmin && !isOwner) {
    throw new Error("دسترسی غیرمجاز برای حذف این تیکت");
  }

  await deleteTicketRepo(ticketId);
  return { success: true, message: "تیکت با موفقیت حذف شد" };
}
