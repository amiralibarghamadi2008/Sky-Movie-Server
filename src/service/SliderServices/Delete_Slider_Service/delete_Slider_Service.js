import { DeleteSlider } from "../../../repository/SliderRepository/SliderRepository.js";

export default async function Delete_Slider_Service(sliderId) {
  try {
    const deleteSlider = await DeleteSlider(sliderId)

    return {success : true , deleteSlider}
  } catch (error) {
    throw error;
  }
}
