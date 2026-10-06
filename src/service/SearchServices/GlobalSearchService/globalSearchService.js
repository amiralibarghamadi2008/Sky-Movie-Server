import { SearchMovie } from "../../../repository/MovieRepository/MovieRepository.js";
import { SearchSeries } from "../../../repository/SeriesRepository/seriesRepository.js";
import { SearchEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";
import { SearchArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function GlobalSearchService(slug) {
  try {
    const querySlug = slug;

    if (!querySlug) {
      throw new Error("موردی برای سرچ کردن وارد نشده است");
    }

    const [searchMovie, searchSeries, searchEpisode, searchArticle] =
      await Promise.all([
        SearchMovie(querySlug),
        SearchSeries(querySlug),
        SearchEpisode(querySlug),
        SearchArticle(querySlug),
      ]);

    return {
      movies: searchMovie,
      series: searchSeries,
      episodes: searchEpisode,
      articles: searchArticle,
    };
  } catch (error) {
    throw error;
  }
}
