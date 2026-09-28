import SliderModel from "../../model/SliderModel/slider.js";

import { FindAll, Create, Delete } from "../BaceRepository/BaceRepository.js";

export async function FindAllSlider() {
  try {
    const FindAllSlider = await FindAll(SliderModel);

    return FindAllSlider;
  } catch (error) {
    throw error;
  }
}

export async function CreateSlider(sliderData) {
  try {
    const CreateSlider = await Create(SliderModel, sliderData);

    return CreateSlider;
  } catch (error) {
    throw error;
  }
}

export async function DeleteSlider(sliderId) {
  try {
    const DeleteSlider = await Delete(SliderModel, sliderId);

    return DeleteSlider;
  } catch (error) {
    throw error;
  }
}
