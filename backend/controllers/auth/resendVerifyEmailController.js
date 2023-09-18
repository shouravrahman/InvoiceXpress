import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";
const { randomBytes } = await import("crypto");
const domainUrl = process.env.DOMAIN;

// $-title Resend Email Verification Token
// $-path GET /api/v1/auth/resend_email_token
// $-auth Public

const resendEmailVerificationToken = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!email) {
		res.status(400);
		throw new Error("An email must be provided");
	}
	if (!user) {
		res.status(400);
		throw new Error("We were unable to find a user for this token");
	}

	if (user.isEmailVerified) {
		res.status(400).send("This user has already been verified please login");
	}

	let verificationToken = await VerificationToken.findOne({
		_userId: user._id,
	});

	if (verificationToken) {
		await VerificationToken.deleteOne();
	}

	const resentToken = randomBytes(32).toString("hex");

	let emailToken = await new VerificationToken({
		_userId: user._id,
		token: resentToken,
	}).save();

	const emailLink = `${domainUrl}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

	const payload = {
		name: user.firstName,
		verificationLink: emailLink,
	};

	await sendEmail(
		user.email,
		"Account Verification",
		payload,
		"./emails/templates/accountVerification.handlebars"
	);

	res.json({
		success: true,
		message: `${user.firstName}, an email has been sent to your account. Please verify within 15 minutes`,
	});
});
export default resendEmailVerificationToken;
