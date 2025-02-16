// import jwt from "jsonwebtoken";
// import { User, Otp } from "../models/index.js";
// import { sendMail } from "../common/mail.js";
// import otpGenerator from "otp-generator";

// export const authController = {
// 	async register(req, res, next) {
// 		try {
// 			const body = req.body;
// 			const user = new User(body);
// 			await user.save();

// 			const otp = otpGenerator.generate(6, {
// 				upperCaseAlphabets: false,
// 				digits: true,
// 				specialChars: false,
// 			});

// 			sendMail(body.email, `this is yout OTP:${otp}`);
// 			const currentOtp = new Otp({ code: otp, author_id: user._id });
// 			await currentOtp.save();
// 			user.password = "";

// 			res.status(201).json({
// 				message: "registred",
// 				data: user,
// 			});
// 		} catch (error) {
// 			if (error.code === 11000) {
// 				error.message = "User already exists";
// 				error.code = 400;
// 				res.status(400).json(error);
// 				return;
// 			}
// 			next(error);
// 		}
// 	},
// 	async login(req, res, next) {
// 		try {
// 			const body = req.body;

// 			if (!body.username || !body.password) {
// 				throw new Error("Username and password are required");
// 			}

// 			const user = await User.findOne({
// 				username: body.username,
// 			});

// 			if (user.isActive !== "active") {
// 				throw new Error("You must be verifed");
// 			}

// 			if (!user) {
// 				throw new Error("User not found");
// 			}

// 			console.log({
// 				userPassword: body.password,
// 				dbUserPassword: user.password,
// 			});

// 			if (body.password !== user.password) {
// 				throw new Error("Invalid credentials");
// 			}

// 			const payload = {
// 				sub: user.id,
// 				role: user.role,
// 				name: user.name,
// 			};

// 			const accessToken = await jwt.sign(
// 				payload,
// 				process.env.JWT_ACCESS_SECRET,
// 				{
// 					expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
// 				},
// 			);

// 			const refreshToken = await jwt.sign(
// 				payload,
// 				process.env.JWT_REFRESH_SECRET,
// 				{
// 					expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
// 				},
// 			);

// 			res.send({
// 				data: {
// 					accessToken,
// 					refreshToken,
// 				},
// 			});
// 		} catch (error) {
// 			next(error);
// 		}
// 	},
// 	async profile(req, res, next) {
// 		try {
// 			const user = req.user;
// 			console.log({ user });

// 			res.send({
// 				messagge: "profile",
// 				data: user,
// 			});
// 		} catch (error) {
// 			next(error);
// 		}
// 	},
// 	async logout(req, res, next) {
// 		try {
// 			console.log();
// 		} catch (error) {
// 			next(error);
// 		}
// 	},

// 	generateOtp() {
// 		return otpGenerator.generate(6, {
// 			upperCaseAlphabets: false,
// 			specialChars: false,
// 		});
// 	},

// 	async verify(req, res, next) {
// 		try {
// 			const body = req.body;

// 			const user = await User.findOne({
// 				username: body.username,
// 			});

// 			if (!user) {
// 				throw new Error("User not found");
// 			}

// 			const otp = await Otp.findOne({
// 				code: body.code,
// 			});

// 			if (!otp) {
// 				throw new Error("otp is not valid");
// 			}

// 			await User.findByIdAndUpdate(user._id, { $set: { isActive: "active" } });
// 			await Otp.findByIdAndDelete(otp._id);
// 			res.send("deleted");
// 		} catch (error) {
// 			next(error);
// 		}
// 	},
// };

import jwt from "jsonwebtoken";
import { User, Otp } from "../models/index.js";
import { sendMail } from "../common/mail.js";
import otpGenerator from "otp-generator";

export const authController = {
	async register(req, res, next) {
		try {
			const body = req.body;
			const existingUser = await User.findOne({ email: body.email });

			if (existingUser) {
				return res.status(400).json({ message: "User already exists" });
			}

			const user = new User(body);
			await user.save();

			const otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
				digits: true,
				specialChars: false,
			});

			sendMail(body.email, `This is your OTP: ${otp}`);
			const currentOtp = new Otp({ code: otp, author_id: user._id });
			await currentOtp.save();

			user.password = "";

			res.status(201).json({
				message: "Registered successfully. Please verify your account.",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	},

	async login(req, res, next) {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				return res.status(400).json({ message: "Username and password are required" });
			}

			const user = await User.findOne({ username });

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			if (user.isActive !== "active") {
				console.log({ user }); // 🛠 Tekshirish uchun foydalanuvchi ma'lumotlarini chiqarish
				return res.status(403).json({ message: "You must be verified" });
			}

			if (password !== user.password) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const payload = {
				sub: user.id,
				role: user.role,
				name: user.name,
			};

			const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
				expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
			});

			const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
				expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
			});

			res.json({
				message: "Login successful",
				data: { accessToken, refreshToken },
			});
		} catch (error) {
			next(error);
		}
	},

	async verify(req, res, next) {
		try {
			const { username, code } = req.body;

			const user = await User.findOne({ username });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const otp = await Otp.findOne({ code, author_id: user._id });
			if (!otp) {
				return res.status(400).json({ message: "Invalid OTP" });
			}

			// ✅ Foydalanuvchini faollashtiramiz va bazada saqlaymiz
			user.isActive = "active";
			await user.save();

			// ✅ Ishlatilgan OTPni o‘chiramiz
			await Otp.findByIdAndDelete(otp._id);

			res.json({ message: "User verified successfully" });
		} catch (error) {
			next(error);
		}
	},

	async profile(req, res, next) {
		try {
			const user = req.user;
			res.json({ message: "Profile data", data: user });
		} catch (error) {
			next(error);
		}
	},

	async logout(req, res, next) {
		try {
			// Logout logikasi qo'shilishi mumkin
			res.json({ message: "Logged out successfully" });
		} catch (error) {
			next(error);
		}
	},

	generateOtp() {
		return otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
		});
	},
};