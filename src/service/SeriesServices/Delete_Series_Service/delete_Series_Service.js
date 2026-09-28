import { Delete } from "../../../repository/BaceRepository/BaceRepository.js";

export default async function Delete_Series_Service(seriesId) {
  try {
    const deleteSeries = await Delete(seriesId)

    return {success : true , deleteSeries}
  } catch (error) {
    throw error;
  }
}
