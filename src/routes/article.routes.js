import { Router } from "express";
import { articleController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/role.middleware.js";
export const articleRouter = Router();

articleRouter.get("/", (req, res, next) =>
	articleController.getAll(req, res, next),
);

articleRouter.get("/:id", (req, res, next) =>
	articleController.getById(req, res, next),
);

articleRouter.post(
	"/",
	authMiddleware,
	roleGuard("admin", "superadmin"),
	(req, res, next) => articleController.create(req, res, next),
);

articleRouter.put("/:id", authMiddleware, (req, res, next) =>
	articleController.update(req, res, next),
);

articleRouter.delete(
	"/:id",
	authMiddleware,
	roleGuard("superadmin"),
	(req, res, next) => articleController.delete(req, res, next),
);