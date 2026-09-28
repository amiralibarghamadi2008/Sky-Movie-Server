import { FindOneSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function GetOne_Series_Service(slugSeries) {
  try {
    const getOneSeries = await FindOneSeries({ slugSeries });

    return {success : true , getOneSeries}
  } catch (error) {
    throw error;
  }
}
