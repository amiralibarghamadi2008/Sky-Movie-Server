import MovieModel from "../../model/MovieModel/movie.js";
import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
} from "../BaceRepository/BaceRepository.js";

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

export async function UpdateMovie(movieData, movieId) {
  try {
    return await Update(MovieModel, movieData, movieId);
  } catch (error) {
    throw error;
  }
}
