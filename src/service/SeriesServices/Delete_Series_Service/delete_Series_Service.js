import { DeleteSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function Delete_Series_Service(seriesId) {
  try {
    const deleteSeries = await DeleteSeries(seriesId)

    return {success : true , deleteSeries}
  } catch (error) {
    throw error;
  }
}
