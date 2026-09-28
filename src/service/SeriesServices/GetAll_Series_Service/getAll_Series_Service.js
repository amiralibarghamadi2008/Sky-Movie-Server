import { FindAllSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function GetAll_Series_Service() {
  try {
    const getAllSeries = await FindAllSeries();

    return { success: true, getAllSeries };
  } catch (error) {
    throw error;
  }
}
