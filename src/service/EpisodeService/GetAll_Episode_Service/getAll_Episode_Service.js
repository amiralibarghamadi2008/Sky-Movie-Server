import { FindAllEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function GetAll_Episode_Service() {
  try {
    const getAllEpisode = await FindAllEpisode();

    return { success: true, getAllEpisode };
  } catch (error) {
    throw error;
  }
}
