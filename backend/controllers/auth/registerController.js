import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";
import Joi from "joi";

const domainUrl = process.env.DOMAIN;

const { randomBytes } = await import("crypto");

// $-title Register User and send email verification link
// $-path POST /api/v1/auth/register
// $-auth Public

const schema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.base": "Email must be a string",
		"string.email": "Invalid email format",
		"any.required": "Email is required",
	}),
	username: Joi.string().required().messages({
		"string.base": "Username must be a string",
		"any.required": "A username is required",
	}),
	firstName: Joi.string().required().messages({
		"string.base": "First name must be a string",
		"any.required": "First name is required",
	}),
	lastName: Joi.string().required().messages({
		"string.base": "Last name must be a string",
		"any.required": "Last name is required",
	}),
	password: Joi.string().required().messages({
		"string.base": "Password must be a string",
		"any.required": "You must enter a password",
	}),
	confirmPassword: Joi.string().required().messages({
		"string.base": "Confirm password must be a string",
		"any.required": "Confirm password field is required",
	}),
});

const registerUser = asyncHandler(async (req, res) => {
	// destructure email,username,firstName,lastName,password,confirmPassword
	const { email, username, firstName, lastName, password, confirmPassword } =
		req.body;

	/*check if email and username exist ,if not throw error
	can be done like this also for flex

	if (!email || !username) {
		const error =
			!email && !username
				? "Email and username are required"
				: email
				? "A username is required"
				: "Email is required";
		res.status(400);
		throw new Error(error);
	}
*/
	/* if (!email) {
		res.status(400);
		throw new Error("Email is required");
	}
	if (!username) {
		res.status(400);
		throw new Error("A username is required");
	}
	if (!firstName || lastName) {
		res.status(400);
		throw new Error("A firstname and lastname must be provided");
	}
	if (!password) {
		res.status(400);
		throw new Error("You must enter a password");
	}
	if (!confirmPassword) {
		res.status(400);
		throw new Error("Confirm password field is required");
	}
	*/

	const { error } = schema.validate(req.body, { abortEarly: false });

	if (error) {
		res.status(400);
		throw new Error(error.details.map((detail) => detail.message).join(". "));
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error(
			"The email address you entered is already associated in another account"
		);
	}

	const newUser = new User({
		email,
		username,
		firstName,
		lastName,
		password,
		confirmPassword,
	});

	const registeredUser = await newUser.save();

	if (!registeredUser) {
		res.status(400);
		throw new Error("User could not be registered");
	}
	if (registeredUser) {
		const verificationToken = randomBytes(32).toString("hex");

		let emailVerifcationToken = await new VerificationToken({
			_userId: registeredUser._id,
			token: verificationToken,
		}).save();

		const emailLink = `${domainUrl}/api/v1/auth/verify/${emailVerifcationToken.token}/${registeredUser._id}`;
		// console.log(emailLink, registeredUser, emailVerifcationToken);

		const payload = {
			name: registeredUser.firstName,
			verificationLink: emailLink,
		};

		await sendEmail(
			registeredUser.email,
			"Account Verfication",
			payload,
			"./emails/templates/accountVerification.handlebars"
		);

		res.json({
			success: true,
			message: `A new user ${registeredUser.firstName} has been registered! A verification email has been sent to your account. Please verify within 15 minutes`,
		});
	}
});

export default registerUser;
