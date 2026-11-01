import { FindOneSeries } from "../../../repository/SeriesRepository/seriesRepository.js";

export default async function GetOne_Series_Service(slugSeries) {
  try {
    const getOneSeries = await FindOneSeries({ slugSeries });

    if (!getOneSeries) {
      throw new Error("موردی پیدا نشد");
    }

    const comments = await FindAllComment({ movie: getOneSeries._id });

    return {
      success: true,
      series: getOneSeries,
      seriesComment: comments,
    };
  } catch (error) {
    throw error;
  }
}
