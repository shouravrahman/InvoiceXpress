import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";
import Joi from "joi";
const { randomBytes } = await import("crypto");
const domainUrl = process.env.DOMAIN;

// $-title Send Password reset email link
// $-path POST /api/v1/auth/reset_password_request
// $-auth Public

const resetPasswordRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		res.status(400);
		throw new Error("An email must be provided");
	}

	const existingUser = await User.findOne({ email }).select("-confirmPassword");

	if (!existingUser) {
		res.status(400);
		throw new Error("That email is not associated with any account");
	}

	let verficationToken = await VerificationToken.findOne({
		_userId: existingUser._id,
	});
	if (verficationToken) {
		await VerificationToken.deleteOne();
	}

	const resetToken = randomBytes(32).toString("hex");

	let newVerificationToken = await new VerificationToken({
		_userId: existingUser._id,
		token: resetToken,
		createdAt: Date.now(),
	}).save();

	if (existingUser && existingUser.isEmailVerified) {
		const emailLink = `${domainUrl}/api/v1/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

		const payload = {
			name: existingUser.firstName,
			resetPasswordLink: emailLink,
		};

		await sendEmail(
			existingUser.email,
			"Password Reset Request",
			payload,
			"./emails/templates/requestResetPassword.handlebars"
		);

		res.json({
			success: true,
			message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
		});
	}
});

// $-title Reset User Password
// $-path POST /api/v1/auth/reset_password
// $-auth Public

const schema = Joi.object({
	password: Joi.string().required().messages({
		"string.base": "Password must be a string",
		"any.required": "You must enter a password",
	}),
	confirmPassword: Joi.string().required().messages({
		"string.base": "Confirm password must be a string",
		"any.required": "Confirm password field is required",
	}),
	userId: Joi.string().messages({
		"string.base": "Confirm password must be a string",
		"any.required": "Confirm password field is required",
	}),
	emailToken: Joi.string().messages({
		"string.base": "Confirm password must be a string",
		"any.required": "Confirm password field is required",
	}),
});

const resetPassowrd = asyncHandler(async (req, res) => {
	const { password, confirmPassword, userId, emailToken } = req.body;
	const { error } = schema.validate(req.body, { abortEarly: false });

	if (error) {
		res.status(400);
		throw new Error(error.details.map((detail) => detail.message).join(". "));
	}
	if (password !== confirmPassword) {
		res.status(400);
		throw new Error("Passowrds do not match");
	}
	if (password.length < 8) {
		res.status(400);
		throw new Error("Passowrd must be at least 8 charecters long");
	}

	const passowrdResetToken = await VerificationToken.findOne({
		_userId: userId,
	});

	if (!passowrdResetToken) {
		res.status(400);
		throw new Error(
			"Your token is either invalid or expired. Try reseting your password again"
		);
	}

	const user = await User.findById({ _id: passowrdResetToken._userId }).select(
		"-confirmPassword"
	);

	if (user && passowrdResetToken) {
		user.password = password;
		await user.save();

		const payload = {
			name: user.firstName,
		};

		await sendEmail(
			user.email,
			"Password Reset Success",
			payload,
			"./emails/templates/resetPassword.handlebars"
		);

		res.json({
			success: true,
			message: `Hey ${user.firstName}, Your password request was successsful. An email has been sent to confirm the same`,
		});
	}
});

export { resetPassowrd, resetPasswordRequest };
