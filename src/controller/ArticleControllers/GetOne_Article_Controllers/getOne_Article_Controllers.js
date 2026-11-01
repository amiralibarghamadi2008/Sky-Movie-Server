import GetOne_Article_Service from "../../../service/ArticleServices/GetOne_Article_Service/getOne_Article_Service.js";

export default async function GetOne_Article_Controllers(req, res) {
  try {
    const queryParams = req.params.slug;

    const { article, articleComment } = await GetOne_Article_Service({
      slug: queryParams,
    });

    if (!article && !articleComment) {
      return res.status(404).json("این فیلم وجود ندارد");
    }

    return res.status(200).json({
      success: true,
      article,
      articleComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
