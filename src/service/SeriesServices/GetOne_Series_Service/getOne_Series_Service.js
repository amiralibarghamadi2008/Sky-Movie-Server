import { FindOne } from "../../../repository/BaceRepository/BaceRepository.js";

export default async function GetOne_Series_Service(slugSeries) {
  try {
    const getOneSeries = await FindOne({ slugSeries });

    return {success : true , getOneSeries}
  } catch (error) {
    throw error;
  }
}
