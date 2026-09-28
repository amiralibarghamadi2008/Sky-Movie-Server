import { CreateSlider } from "../../../repository/SliderRepository/SliderRepository.js";

export default async function Create_Slider_Service(sliderData) {
  try {
    const createSlider = await CreateSlider(sliderData)

    return {success : true , createSlider}
  } catch (error) {
    throw error;
  }
}
