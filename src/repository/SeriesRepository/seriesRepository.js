import SeriesModel from "../../model/SeriesModel/series.js";

import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
} from "../BaseRepository/BaseRepository.js";

export async function FindAllSeries() {
  try {
    const FindAllSeries = await FindAll(SeriesModel);

    return FindAllSeries;
  } catch (error) {
    throw error;
  }
}

export async function FindOneSeries(seriesSlug) {
  try {
    const FindOneSeries = await FindOne(SeriesModel, seriesSlug);

    return FindOneSeries;
  } catch (error) {
    throw error;
  }
}

export async function CreateSeries(seriesData) {
  try {
    const CreateSeries = await Create(SeriesModel, seriesData);

    return CreateSeries;
  } catch (error) {
    throw error;
  }
}

export async function DeleteSeries(seriesId) {
  try {
    const DeleteSeries = await Delete(SeriesModel, seriesId);

    return DeleteSeries;
  } catch (error) {
    throw error;
  }
}

export async function UpdateSeries(seriesId, seriesData) {
  try {
    const UpdateSeries = await Update(SeriesModel, seriesId, seriesData);

    return UpdateSeries;
  } catch (error) {
    throw error;
  }
}
