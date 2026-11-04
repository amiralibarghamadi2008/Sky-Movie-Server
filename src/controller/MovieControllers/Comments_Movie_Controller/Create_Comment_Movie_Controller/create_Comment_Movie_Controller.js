import Create_Comment_Movie_Sercie from "../../../../service/MovieServices/Comments_Movie_service/Create_Comment_Movie_Sercie/create_Comment_Movie_Sercie.js";

export default async function Create_Comment_Movie_Controller(req, res) {
  try {
    const queryParams = req.params.slug;

    const userData = req.user.userId

    const reqBody = req.body;

    const { movie, comment } = await Create_Comment_Movie_Sercie(
      { slug: queryParams },
      reqBody,
      userData,
    );

    if (!movie || !comment) {
      return res.status(400).json({
        success: false,
        message: "فیلد ها اجباری هستش",
      });
    }

    return res.status(200).json({
      success: true,
      movie,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
