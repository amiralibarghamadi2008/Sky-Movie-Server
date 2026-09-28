import { CreateSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function Create_Series_Service(seriesData) {
  try {
    const createSeries = await CreateSeries(seriesData)

    return {success : true , createSeries}
  } catch (error) {
    throw error;
  }
}
