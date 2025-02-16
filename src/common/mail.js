import { createTransport } from "nodemailer";

const transporter = createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER, // TODO: update your email
		pass: process.env.MAIL_PASS, // TODO: Update your password
	},
});

export function sendMail(userMail, message) {
	try {
		const mailOptions = {
			from: process.env.MAIL_USER,
			to: userMail,
			subject: "OTP manager",
			text: message,
			name: "Khamidullo",
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Mail Sent!");
			}
		});
	} catch (error) {
		console.log("ERROR:", error);
	}
}

// sendMail("lustrum062@gmail.com");
// sendMail("aliataev9979@gmail.com");
// sendMail("abdulhaqsherqoziyev@gmail.com");

// export default transporter;