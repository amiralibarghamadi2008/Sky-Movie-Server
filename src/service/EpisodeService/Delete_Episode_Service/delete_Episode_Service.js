import { DeleteEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function Delete_Episode_Service(episodeId) {
  try {
    const deleteEpisode = await DeleteEpisode(episodeId)

    return {success : true , deleteEpisode}
  } catch (error) {
    throw error;
  }
}
