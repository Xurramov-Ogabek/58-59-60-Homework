import { Schema, model } from "mongoose";

const articleSchema = new Schema(
	{
		title: {
			type: String,
			index: true,
			trim: true,
			lowercase: true,
		},
		content: {
			type: String,
			trim: true,
			lowercase: true,
		},
		author_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
	},
	{
		timestamps: true,
	},
);

export const Article = model("Article", articleSchema);
 