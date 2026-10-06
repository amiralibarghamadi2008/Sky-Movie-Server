import ShowTicketService from "../../../service/TicketServices/ShowAllTicketService/showAllTicketService.js"

export default async function ShowAllTicketController(req , res) {
    try {
        const findAll = await ShowTicketService()

        if (!findAll) {
            return res.status(400).json("تیکتی یافت نشد")
        }

        return res.status(200).json(findAll)

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `خطای سرور : ${error}`,
        })
    }
}