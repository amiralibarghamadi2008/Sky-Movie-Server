import { CreateEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function Create_Episode_Service(episodeData) {
  try {
    const createEpisode = await CreateEpisode(episodeData)

    return {success : true , createEpisode}
  } catch (error) {
    throw error;
  }
}
