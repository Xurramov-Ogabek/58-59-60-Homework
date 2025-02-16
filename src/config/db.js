import { connect } from "mongoose";

const mongodb_uri =
	process.env.DATABASE_URI || "mongodb://localhost:27017/online-ticket-system";

export const connectDB = async () => {
	try {
		await connect(mongodb_uri);
		console.log("MongoDB connected");
	} catch (error) {
		console.error(error);
	}
};