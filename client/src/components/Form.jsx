import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = ({ schema, onSubmit, children, defaultValues }) => {
	const methods = useForm({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const onFormSubmit = async (data) => {
		// Call the provided onSubmit function
		await onSubmit(data);
		console.log(methods.formState.isSubmitted);
		// Reset the form after submission is finished
		methods.reset();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onFormSubmit)} className='card-body'>
				{children}
			</form>
		</FormProvider>
	);
};

export const InputField = ({ label, name, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className='form-control'>
			<label className='my-2'>
				<span className='label-text font-figtree'>{label}</span>
			</label>
			<input
				name={name}
				{...register(name)}
				className='input input-bordered'
				{...props}
			/>
			<span className='text-red-500 mt-1'>
				{errors[name] && <p>{errors[name].message}</p>}
			</span>
		</div>
	);
};

export const PasswordInput = ({ name, label, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const [show, setShow] = React.useState(false);

	return (
		<div className='form-control relative'>
			<label className='my-2'>
				<span className='label-text font-figtree'>{label}</span>
			</label>
			<input
				type={show ? "text" : "password"}
				{...register(name)}
				className='input input-bordered'
				{...props}
			/>

			<button
				type='button'
				className='absolute top-14 right-3 w-5 h-5'
				onClick={() => setShow(!show)}
			>
				{show ? (
					<img src='/hide.svg' alt='' className='object-cover' />
				) : (
					<img src='/show.svg' alt='' className='object-cover' />
				)}
			</button>
			<span className='text-red-500 mt-1'>
				{errors[name] && <p>{errors[name].message}</p>}
			</span>
		</div>
	);
};

export const ConfirmPasswordInput = ({ name, label, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const [show, setShow] = React.useState(false);

	return (
		<div className='form-control relative'>
			<label className='my-2'>
				<span className='label-text font-figtree'>{label}</span>
			</label>
			<input
				type={show ? "text" : "password"}
				{...register(name)}
				className='input input-bordered'
				{...props}
			/>

			<button
				type='button'
				onClick={() => setShow(!show)}
				className='absolute top-14 right-3 w-5 h-5'
			>
				{show ? (
					<img src='/hide.svg' alt='' className='object-cover' />
				) : (
					<img src='/show.svg' alt='' className='object-cover' />
				)}
			</button>

			<span className='text-red-500 mt-1'>
				{errors[name] && <p>{errors[name].message}</p>}
			</span>
		</div>
	);
};

export const SelectInput = ({ name, label, options, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='form-control'>
			<label>{label}</label>
			<select
				name={name}
				{...register(name)}
				className='select select-bordered'
				{...props}
			>
				{options.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{errors[name] && <p>{errors[name].message}</p>}
		</div>
	);
};

export const CheckboxInput = ({ name, label, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='form-control'>
			<label className='label justify-start gap-4'>
				<input type='checkbox' name={name} {...register(name)} {...props} />
				<span className='label-text'>{label}</span>
			</label>

			<span className='text-red-500 mt-1'>
				{errors[name] && <p>{errors[name].message}</p>}
			</span>
		</div>
	);
};

export const RadioInput = ({ name, options, ...props }) => {
	const {
		register,
		// formState: { errors },
	} = useFormContext();

	return (
		<div>
			{options.map((option) => (
				<label key={option.value}>
					<input
						type='radio'
						{...register(name)}
						value={option.value}
						{...props}
					/>
					{option.label}
				</label>
			))}
		</div>
	);
};

export const SubmitButton = ({ children }) => {
	const {
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<div className='form-control mt-6'>
			<button className='btn btn-accent' type='submit' disabled={isSubmitting}>
				{isSubmitting ? "Submitting..." : children}
			</button>
		</div>
	);
};

Form.InputField = InputField;
Form.PasswordInput = PasswordInput;
Form.ConfirmPasswordInput = ConfirmPasswordInput;
Form.SelectInput = SelectInput;
Form.CheckboxInput = CheckboxInput;
Form.RadioInput = RadioInput;
Form.SubmitButton = SubmitButton;

export default Form;
