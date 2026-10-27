import CommentModel from "../../model/CommentModel/comment.js";
import { FindAll , FindOneById , Create , Delete , Update } from "../BaseRepository/BaseRepository.js"

export async function FindAllComment() {
  try {
    return await FindAll(CommentModel)
  } catch (error) {
    throw error;
  }
}


export async function FindOneComment(commentId) {
  try {
    return await FindOneById(CommentModel , commentId)
  } catch (error) {
    throw error;
  }
}


export async function CreateComment(commentData) {
  try {
    return await Create(CommentModel , commentData)
  } catch (error) {
    throw error;
  }
}


export async function DeleteComment(commentId) {
  try {
    return await Delete(CommentModel , commentId)
  } catch (error) {
    throw error;
  }
}


export async function UpdateComment(commentId , commentData) {
  try {
    return await Update(CommentModel , commentId , commentData)
  } catch (error) {
    throw error;
  }
}
