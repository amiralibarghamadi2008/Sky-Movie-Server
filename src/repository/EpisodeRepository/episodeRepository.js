import EpisodeModel from "../../model/EpisodeModel/episode.js";

import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
} from "../BaceRepository/BaceRepository.js";

export async function FindAllEpisode() {
  try {
    const FindAllEpisode = await FindAll(EpisodeModel);

    return FindAllEpisode;
  } catch (error) {
    throw error;
  }
}

export async function FindOneEpisode(episodeSlug) {
  try {
    const FindOneEpisode = await FindOne(EpisodeModel, episodeSlug);

    return FindOneEpisode;
  } catch (error) {
    throw error;
  }
}

export async function CreateEpisode(episodeData) {
  try {
    const CreateEpisode = await Create(EpisodeModel, episodeData);

    return CreateEpisode;
  } catch (error) {
    throw error;
  }
}

export async function DeleteEpisode(episodeId) {
  try {
    const DeleteEpisode = await Delete(EpisodeModel, episodeId);

    return DeleteEpisode;
  } catch (error) {
    throw error;
  }
}

export async function UpdateEpisode(episodeId, episodeData) {
  try {
    const UpdateEpisode = await Update(EpisodeModel, episodeId, episodeData);

    return UpdateEpisode;
  } catch (error) {
    throw error;
  }
}
