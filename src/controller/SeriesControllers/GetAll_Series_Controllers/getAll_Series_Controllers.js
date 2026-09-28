import GetAll_Series_Service from "../../../service/SeriesServices/GetAll_Series_Service/getAll_Series_Service.js";

export default async function GetAll_Series_Controllers(req, res) {
  try {
    const getAllSeries = await GetAll_Series_Service();

    return res.status(200).json(getAllSeries);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
