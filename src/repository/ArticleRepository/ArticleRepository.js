import ArticleModel from "../../model/ArticleModel/article.js";

import {
  FindAll,
  FindOne,
  Create,
  Delete,
  Update,
  FindAllForSearch,
} from "../BaseRepository/BaseRepository.js";

export async function FindAllArticle() {
  try {
    const FindAllArticle = await FindAll(ArticleModel);

    return FindAllArticle;
  } catch (error) {
    throw error;
  }
}

export async function FindOneArticle(articleSlug) {
  try {
    const FindOneArticle = await FindOne(ArticleModel, articleSlug);

    return FindOneArticle;
  } catch (error) {
    throw error;
  }
}

export async function CreateArticle(articleData) {
  try {
    const CreateArticle = await Create(ArticleModel, articleData);

    return CreateArticle;
  } catch (error) {
    throw error;
  }
}

export async function DeleteArticle(articleId) {
  try {
    const DeleteArticle = await Delete(ArticleModel, articleId);

    return DeleteArticle;
  } catch (error) {
    throw error;
  }
}

export async function UpdateArticle(articleId, articleData) {
  try {
    const UpdateArticle = await Update(ArticleModel, articleId, articleData);

    return UpdateArticle;
  } catch (error) {
    throw error;
  }
}

export async function SearchArticle(articleSlug) {
  try {
    return await FindAllForSearch(ArticleModel, articleSlug);
  } catch (error) {
    throw error;
  }
}
