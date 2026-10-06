import MovieModel from "../../model/MovieModel/movie.js";
import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
  FindAllForSearch,
} from "../BaseRepository/BaseRepository.js";

export async function FindAllMovie() {
  try {
    return await FindAll(MovieModel);
  } catch (error) {
    throw error;
  }
}

export async function FindOneMovie(movieId) {
  try {
    return await FindOne(MovieModel, movieId);
  } catch (error) {
    throw error;
  }
}

export async function CreateMovie(movieData) {
  try {
    return await Create(MovieModel, movieData);
  } catch (error) {
    throw error;
  }
}

export async function DeleteMovie(movieId) {
  try {
    return await Delete(MovieModel, movieId);
  } catch (error) {
    throw error;
  }
}

export async function UpdateMovie(movieId, movieData) {
  try {
    return await Update(MovieModel, movieId, movieData);
  } catch (error) {
    throw error;
  }
}

export async function SearchMovie(keyword) {
  try {
    const filter = {$text : {$search : keyword}}

    const option = {
      select: "titleMovie genres shortDes",
      limit: 6,
      sort: { score: { $meta: "textScore" } },
    }

    return await FindAllForSearch(MovieModel, filter , option);
  } catch (error) {
    throw error;
  }
}
