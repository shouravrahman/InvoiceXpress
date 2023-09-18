import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { systemLogs } from "../../utils/logger.js";
import Joi from "joi";

// $-title Login User, get access and refresh token
// $-path POST /api/v1/auth/login
// $-auth Public
const schema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.base": "Email must be a string",
		"string.email": "Invalid email format",
		"any.required": "Email is required",
	}),

	password: Joi.string().required().messages({
		"string.base": "Password must be a string",
		"any.required": "You must enter a password",
	}),
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const { error } = schema.validate(req.body, { abortEarly: false });

	if (error) {
		res.status(400);
		throw new Error(error.details.map((detail) => detail.message).join(". "));
	}

	const existingUser = await User.findOne({ email }).select("+password");

	if (!existingUser || !(await existingUser.comparePassword(password))) {
		res.status(401);

		systemLogs.error("incorrect email or password");
		throw new Error("incorrect email or password");
	}

	if (!existingUser.isEmailVerified) {
		res.status(400);
		throw new Error(
			"You are not verified. Check your email for verification mail sent during registration"
		);
	}

	if (!existingUser.active) {
		res.status(400);
		throw new Error(
			"You have been deactivated by the admin. Contact us for enquiries"
		);
	}

	if (existingUser || (await existingUser.comparePassword(password))) {
		const accessToken = jwt.sign(
			{
				id: existingUser._id,
				roles: existingUser.roles,
			},
			process.env.JWT_ACCESS_SECRET_KEY,
			{ expiresIn: "1h" }
		);

		const newRefreshToken = jwt.sign(
			{
				id: existingUser._id,
			},
			process.env.JWT_REFRESH_SECRET_KEY,
			{ expiresIn: "1d" }
		);

		const cookies = req.cookies;

		let newRefreshTokenArray = !cookies?.jwt
			? existingUser.refreshToken
			: existingUser.refreshToken.filter(
					(refToken) => refToken !== cookies.jwt
			  );

		if (cookies?.jwt) {
			const refreshToken = cookies.jwt;
			const existingRefreshToken = await User.findOne({ refreshToken }).exec();

			if (!existingRefreshToken) {
				newRefreshTokenArray = [];
			}

			const options = {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
				secure: true,
				sameSite: "None",
			};

			res.clearCookie("jwt", options);
		}

		existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
		await existingUser.save();

		const options = {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			secure: true,
			sameSite: "None",
		};

		res.cookie("jwt", newRefreshToken, options);

		res.json({
			success: true,
			existingUser,
			accessToken,
		});
	} else {
		res.status(401);
		throw new Error("Invalid credentials provided");
	}
});
export default loginUser;
