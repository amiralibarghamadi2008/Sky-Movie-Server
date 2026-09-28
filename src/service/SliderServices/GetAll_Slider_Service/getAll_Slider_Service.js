import { FindAllSlider } from "../../../repository/SliderRepository/SliderRepository.js";

export default async function GetAll_Slider_Service() {
  try {
    const getAllSlider = await FindAllSlider();

    return { success: true, getAllSlider };
  } catch (error) {
    throw error;
  }
}
