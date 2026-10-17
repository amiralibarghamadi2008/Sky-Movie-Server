import { SearchMovie } from "../../../repository/MovieRepository/MovieRepository.js";
import { SearchSeries } from "../../../repository/SeriesRepository/seriesRepository.js";
import { SearchEpisode } from "../../../repository/EpisodeRepository/episodeRepository.js";
import { SearchArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function GlobalSearchService(keyword) {
  try {
    const queryKeyWord = keyword;

    if (!queryKeyWord) {
      throw new Error("موردی برای سرچ کردن وارد نشده است");
    }

    const [searchMovie, searchSeries, searchEpisode, searchArticle] =
      await Promise.all([
        SearchMovie(queryKeyWord),
        SearchSeries(queryKeyWord),
        SearchEpisode(queryKeyWord),
        SearchArticle(queryKeyWord),
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
