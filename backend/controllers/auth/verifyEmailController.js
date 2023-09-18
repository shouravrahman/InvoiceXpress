import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainUrl = process.env.DOMAIN;

// $-title Verify User email
// $-path GET /api/v1/auth/verify/:emailToken/:userId
// $-auth Public

const verfifyUserEmail = asyncHandler(async (req, res) => {
	const user = await User.findOne({ _id: req.params.userId }).select(
		"-confirmPassword"
	);

	if (!user) {
		res.status(400);
		throw new Error("We were unable to find a user for this token");
	}

	if (user.isEmailVerified) {
		res.status(400).send("This user has already been verified please login");
	}

	const userToken = await VerificationToken.findOne({
		_userId: user._id,
		token: req.params.emailToken,
	});

	if (!userToken) {
		res.status(400);
		throw new Error("Token invalid! Your token may have expired");
	}

	user.isEmailVerified = true;

	await user.save();

	if (user.isEmailVerified) {
		const emailLink = `${domainUrl}/login`;

		const payload = {
			name: user.firstName,
			link: emailLink,
		};

		await sendEmail(
			user.email,
			"Welcome - Account Verified",
			payload,
			"./emails/templates/welcome.handlebars"
		);

		res.redirect("/auth/verify");
	}
});

export default verfifyUserEmail;
