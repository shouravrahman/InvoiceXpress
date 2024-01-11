import "dotenv/config";
import nodemailer from "nodemailer";

let transporter;

if (process.env.NODE_ENV === "development") {
	// Development options:

	// 1. Mailtrap (free for testing):
	// transporter = nodemailer.createTransport({
	// 	host: "smtp.mailtrap.io",
	// 	port: 2525,
	// 	auth: {
	// 		user: process.env.MAILTRAP_USER,
	// 		pass: process.env.MAILTRAP_PASSWORD,
	// 	},
	// });
	 transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "68d150278c4b2a",
    pass: "79f33f768e94bd"
  }
});

	// 2. Gmail (if you have a Gmail account):
	// transporter = nodemailer.createTransport({
	// 	host: "smtp.gmail.com",
	// 	port: 465,
	// 	secure: true, // Use SSL

	// 	auth: {
	// 		user: process.env.GMAIL_USER,
	// 		pass: process.env.GMAIL_PASSWORD,
	// 	},
	// });
} else if (process.env.NODE_ENV === "production") {
	// Production options:
	// 1. Mailgun (popular transactional email service):
	// transporter = nodemailer.createTransport({
	// 	host: process.env.MAILGUN_HOST,
	// 	port: 587,
	// 	auth: {
	// 		user: process.env.MAILGUN_USER,
	// 		pass: process.env.MAILGUN_PASSWORD,
	// 	},
	// });
	// 2. SendGrid (another popular option):
	// transporter = nodemailer.createTransport({
	// 	host: process.env.SENDGRID_HOST,
	// 	port: 587,
	// 	auth: {
	// 		user: process.env.SENDGRID_USER,
	// 		pass: process.env.SENDGRID_PASSWORD,
	// 	},
	// });
	// 3. Custom SMTP server (if you have one):
	// transporter = nodemailer.createTransport({
	// 	host: process.env.SMTP_HOST,
	// 	port: process.env.SMTP_PORT,
	// 	auth: {
	// 		user: process.env.SMTP_USER,
	// 		pass: process.env.SMTP_PASSWORD,
	// 	},
	// });
}

export default transporter;
