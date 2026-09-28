import { Update } from "../../../repository/BaceRepository/BaceRepository.js";

export default async function Update_Series_Service(seriesId, seriesData) {
  try {
    const updateSeries = await Update(seriesId, seriesData);

    return { success: true, updateSeries };
  } catch (error) {
    throw error;
  }
}
