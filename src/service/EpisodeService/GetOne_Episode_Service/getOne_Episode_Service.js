import { FindOneEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function GetOne_Episode_Service(slugEpisode) {
  try {
    const getOneEpisode = await FindOneEpisode({ slugEpisode });

    return {success : true , getOneEpisode}
  } catch (error) {
    throw error;
  }
}
