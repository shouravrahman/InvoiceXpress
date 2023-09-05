import "dotenv/config";
import mongoose from "mongoose";
import validator from "validator";
import { USER } from "../constants";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
			validate: [validator.isEmail, "Please provide a valid Email"],
		},
		username: {
			type: String,
			required: true,
			unique: true,
			required: true,
			trim: true,
			validate: {
				validator: function (value) {
					return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
				},
				message:
					"username must be alphaneumeric, without special charecters. Hyphens and underscores allowed",
			},
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
			validate: [
				validator.isAlphanumeric,
				"First name can only have Alphanumeric values. No special charecters allowed",
			],
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			validate: [
				validator.isAlphanumeric,
				"Last name can only have Alphanumeric values. No special charecters allowed",
			],
		},

		password: {
			type: String,
			select: false,
			validate: [
				validator.isStrongPassword,
				"Password must be 8 charecters long,with at least 1 uppercase and lower case letters and at least 1 symbol",
			],
		},
		confirmPassword: {
			// can be done in client side
			type: String,
			validate: {
				validator: function (value) {
					return value === this.password;
				},
				message: "Passwords do not match",
			},
		},
		isEmailVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		provider: {
			type: String,
			required: true,
			default: "email",
		},
		googleID: String,
		avatar: String,
		businessName: String,
		phoneNumber: {
			type: String,
			default: "+254123456789",
			validate: [
				validator.isMobilePhone,
				"Your phone number must begin with a '+, followed by your country code then actual phone number e.g +254123456789",
			],
		},
		address: String,
		city: String,
		country: String,
		passwordChangedAt: Date,

		roles: {
			type: [String],
			default: [USER],
		},
		active: {
			type: Boolean,
			default: true,
		},
		refreshToken: [String],
	},
	{
		timestamps: true,
	}
);

//hook
userSchema.pre("save", async function (next) {
	if (this.roles.length === 0) {
		this.roles.push(USER);
		next();
	}
});

//hash

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next(); //what if i dont return?
	}

	const salt = await bcrypt.genSalt(10);

	this.password = await bcrypt.hash(this.password, salt);

	this.confirmPassword = undefined;
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isNew) {
		return next();
	}

	this.passwordChangedAt = Date.now();
	next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
	return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
