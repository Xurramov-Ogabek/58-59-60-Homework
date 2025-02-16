import { Article } from "../models/index.js";
import { BaseController } from "./base.controller.js";

class ArticleController extends BaseController {
	async getAll(req, res, next) {
		try {
			const articles = await Article.find();
			res.json({ message: "All articles", data: articles });
		} catch (error) {
			next(error);
		}
	}
	constructor() {
		super(Article);
	}

	async getById(req, res, next) {
		try {
			const article = await Article.findById(req.params.id);
			if (!article) {
				return res.status(404).json({ message: "Article not found" });
			}
			res.json({ message: "Article found", data: article });
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newArticle = new Article(req.body);
			await newArticle.save();
			res.status(201).json({ message: "Article created", data: newArticle });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!updatedArticle) {
				return res.status(404).json({ message: "Article not found" });
			}
			res.json({ message: "Article updated", data: updatedArticle });
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const deletedArticle = await Article.findByIdAndDelete(req.params.id);
			if (!deletedArticle) {
				return res.status(404).json({ message: "Article not found" });
			}
			res.json({ message: "Article deleted successfully" });
		} catch (error) {
			next(error);
		}
	}
}

export const articleController = new ArticleController();