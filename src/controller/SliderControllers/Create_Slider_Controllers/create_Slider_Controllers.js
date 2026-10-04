import Create_Slider_Service from "../../../service/SliderServices/Create_Slider_Service/create_Slider_Service.js";
import { validateCreateSlider } from "../../../validator/SliderValidator/sliderValidator.js";

export default async function Create_Slider_Controllers(req, res) {
  try {

    const checkResult = validateCreateSlider(req.body);

    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

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
