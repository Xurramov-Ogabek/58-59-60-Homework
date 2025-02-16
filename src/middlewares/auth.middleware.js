import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
export const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			res.status(403).send("wrong authorization type");
			return;
		}

		const [type, token] = req.headers.authorization.split(" ");
		// "Bearer 1wjiojqsjakndlkandklnalkndlkan"
		// ["Bearer", "1wjiojqsjakndlkandklnalkndlkan"]
		// let type = "Bearer";
		// let token = "1wjiojqsjakndlkandklnalkndlkan";

		if (type !== "Bearer") {
			res.status(403).send("wrong authorization type");
			return;
		}

		const decode = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

		const user = await User.findById(decode.sub);

		if (!user) {
			throw new Error("User not found");
		}

		req.user = user;

		next();
	} catch (error) {
		res.send(error);
	}
};