import React from "react";
import { z } from "zod";
import Form from "./Form";
import { FormProvider } from "react-hook-form";

const schema = z
	.object({
		fullname: z
			.string()
			.min(3, "Fullname must be at least 3 characters")
			.max(50, "Fullname cannot exceed 50 characters"),

		email: z.string().email("Must be a valid email"),

		password: z.string().min(6, "Password must be at least 6 characters"),

		company: z
			.string()
			.min(3, "Company name must be at least 3 characters")
			.max(50, "Company name cannot exceed 50 characters"),

		passwordConfirmation: z.string(),
		accept: z.literal(true, {
			errorMap: () => ({
				message: "Please accept terms & conditions before continuing.",
			}),
		}),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ["passwordConfirmation"],
	});

const RegisterForm = () => {
	const onSubmit = (data) => {
		//form submission logic here
		console.log("Form submitted:", data);
	};

	return (
		<Form schema={schema} onSubmit={onSubmit}>
			<Form.InputField label='Full Name' name='fullname' />
			<Form.InputField label='Email' name='email' />
			{/* <Form.InputField label='Password' name='password' type='password' /> */}
			<Form.PasswordInput label='Password' name='password' />
			<Form.ConfirmPasswordInput
				label='Confirm Password'
				name='passwordConfirmation'
			/>
			<Form.InputField label='Company Name' name='company' />
			<Form.SubmitButton>Register</Form.SubmitButton>
			<Form.CheckboxInput label='I Accept Terms & Conditions.' name='accept' />
		</Form>
	);
};

export default RegisterForm;
