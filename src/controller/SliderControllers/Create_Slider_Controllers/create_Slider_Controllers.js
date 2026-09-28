import Create_Slider_Service from "../../../service/SliderServices/Create_Slider_Service/create_Slider_Service.js";

export default async function Create_Slider_Controllers(req, res) {
  try {
    const { image, link, title } = req.body;

    const createSlider = await Create_Slider_Service( { image, link, title } , req.use );

    return res.status(200).json(createSlider);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
