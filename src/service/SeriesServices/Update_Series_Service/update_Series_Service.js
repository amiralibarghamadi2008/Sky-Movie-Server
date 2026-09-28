import { UpdateSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function Update_Series_Service(seriesId, seriesData) {
  try {
    const updateSeries = await UpdateSeries(seriesId, seriesData);

    return { success: true, updateSeries };
  } catch (error) {
    throw error;
  }
}
