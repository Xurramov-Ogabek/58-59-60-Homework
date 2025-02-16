import { Category } from "../models/index.js";
import { BaseController } from "./base.controller.js";

class CategoryController extends BaseController {
	constructor() {
		super(Category);
	}
}

export const categoryController = new CategoryController();