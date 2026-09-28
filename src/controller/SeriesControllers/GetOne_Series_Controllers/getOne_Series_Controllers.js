import GetOne_Series_Service from "../../../service/SeriesServices/GetOne_Series_Service/getOne_Series_Service.js";

export default async function GetOne_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.slug

    const getOneSeries = await GetOne_Series_Service(queryParams)

    return res.status(200).json(getOneSeries)
  } catch (error) {
    throw error;
  }
}
