import GetAll_Slider_Service from "../../../service/SliderServices/GetAll_Slider_Service/getAll_Slider_Service.js";

export default async function GetAll_Slider_Controllers(req, res) {
  try {
    const getAllSlider = await GetAll_Slider_Service();

    return res.status(200).json(getAllSlider);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
