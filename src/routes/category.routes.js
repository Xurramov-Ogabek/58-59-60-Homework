import { Router } from "express";
import { categoryController } from "../controllers/index.js";

export const categoryRouter = Router();

categoryRouter.get("/", (req, res, next) =>
	categoryController.getAll(req, res, next),
);

categoryRouter.get("/:id", (req, res, next) =>
	categoryController.getById(req, res, next),
);

categoryRouter.post("/", (req, res, next) =>
	categoryController.create(req, res, next),
);

categoryRouter.put("/:id", (req, res, next) =>
	categoryController.update(req, res, next),
);

categoryRouter.delete("/:id", (req, res, next) =>
	categoryController.delete(req, res, next),
);