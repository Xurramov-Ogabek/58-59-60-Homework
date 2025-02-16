import { Schema, model } from "mongoose";

const otpSchema = new Schema(
	{
		code: {
			type: String,
			index: true,
			trim: true,
		},
		author_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

export const Otp = model("Otp", otpSchema);