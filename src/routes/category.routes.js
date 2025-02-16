import { Router } from "express";
import { categoryController } from "../controllers/index.js";

export const categoryRouter = Router();

//get all category
categoryRouter.get("/", (req, res, next) =>
	categoryController.getAll(req, res, next),
);

// get one category by id
categoryRouter.get("/:id", (req, res, next) =>
	categoryController.getById(req, res, next),
);

// create category
categoryRouter.post("/", (req, res, next) =>
	categoryController.create(req, res, next),
);

// update category
categoryRouter.put("/:id", (req, res, next) =>
	categoryController.update(req, res, next),
);

// delete category
categoryRouter.delete("/:id", (req, res, next) =>
	categoryController.delete(req, res, next),
);