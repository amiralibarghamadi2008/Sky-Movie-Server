import Delete_Slider_Service from "../../../service/SliderServices/Delete_Slider_Service/delete_Slider_Service.js";

export default async function Delete_Slider_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const deleteSlider = await Delete_Slider_Service(queryParams , req.user)

    return res.status(200).json(deleteSlider)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
