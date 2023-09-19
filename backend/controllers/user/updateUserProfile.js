import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// $-title Update User Profile
// $-path  PATCH  /api/v1/user/profile
// $-auth  Private

const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const {
		email,
		username,
		password,
		confirmPassword,
		roles,
		isEmailVerified,
		googleID,
		provider,
	} = req.body;

	const user = await User.findById(userId);

	if (!user) {
		res.status(400);
		throw new Error("user does not exist");
	}
	if (password || confirmPassword) {
		res.status(400);
		throw new Error("please use password reset functionality instead");
	}
	if (email || isEmailVerified || provider || roles || googleID) {
		res.status(400);
		throw new Error("You are not allowed to update that field in this route");
	}

	const fieldsToUpdate = req.body;

	const updatedProfile = await User.findByIdAndUpdate(
		userId,
		{ ...fieldsToUpdate },
		{ new: true, runValidators: true }
	).select("-refreshToken");

	res.status(200).json({
		success: true,
		message: `${user.firstName}, your profile was successfully updated`,
		updatedProfile,
	});
});

export default updateUserProfile;
