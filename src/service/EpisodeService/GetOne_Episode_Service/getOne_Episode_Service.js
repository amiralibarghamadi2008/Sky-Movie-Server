import { FindAllComment } from "../../../repository/CommentRepository/commentRepository.js";
import { FindOneEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";

export default async function GetOne_Episode_Service(slugEpisode) {
  try {
    const getOneEpisode = await FindOneEpisode({ slugEpisode });

    if (!getOneEpisode) {
      throw new Error("موردی پیدا نشد");
    }

    const comments = await FindAllComment({ movie: getOneEpisode._id });

    return {
      success: true,
      movie: getOneEpisode,
      movieComment: comments,
    };
  } catch (error) {
    throw error;
  }
}
