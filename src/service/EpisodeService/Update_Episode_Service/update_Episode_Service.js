import { UpdateEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function Update_Episode_Service(episodeId, episodeData) {
  try {
    const updateEpisode = await UpdateEpisode(episodeId, episodeData);

    return { success: true, updateEpisode };
  } catch (error) {
    throw error;
  }
}
