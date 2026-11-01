import CommentModel from "../../model/CommentModel/comment.js";
import {  FindOneById , Create , Delete , Update } from "../BaseRepository/BaseRepository.js"

export async function FindAllComment(filter = {}) {
  try {
    return await CommentModel.find(filter)
      .sort({createdAt: -1})
      .populate({
        path : "user",
        select : "firstName Avatar",
        match : { isBanned : false }
      })
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
