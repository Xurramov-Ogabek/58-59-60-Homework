import { Router } from "express";
import { validate, ValidationError } from "express-validation";
import { authController } from "../controllers/index.js";
import {
	loginValidation,
	userLoginSchema,
	userRegistrationSchema,
} from "../validation/index.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post(
	"/register",
	validateData(userRegistrationSchema),
	authController.register,
);
authRouter.post("/login", validateData(userLoginSchema), authController.login);
authRouter.post("/verify", authController.verify);
authRouter.get("/logout", authController.logout);
authRouter.get("/profile", authMiddleware, authController.profile);