import { Create } from "../../../repository/BaceRepository/BaceRepository.js";

export default async function Create_Series_Service(seriesData) {
  try {
    const createSeries = await Create(seriesData)

    return {success : true , createSeries}
  } catch (error) {
    throw error;
  }
}
