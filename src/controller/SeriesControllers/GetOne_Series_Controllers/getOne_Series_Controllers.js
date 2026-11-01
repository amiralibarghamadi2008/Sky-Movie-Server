import GetOne_Series_Service from "../../../service/SeriesServices/GetOne_Series_Service/getOne_Series_Service.js";

export default async function GetOne_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.slug;

    const { series, seriesComment } = await GetOne_Series_Service({
      slug: queryParams,
    });

    if (!series && !seriesComment) {
      return res.status(404).json("این فیلم وجود ندارد");
    }

    return res.status(200).json({
      success: true,
      series,
      seriesComment,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
