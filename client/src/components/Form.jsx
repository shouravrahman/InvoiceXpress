import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = ({ schema, onSubmit, children, defaultValues }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues,
	});
	const onFormSubmit = async (data) => {
		// Call the provided onSubmit function
		await onSubmit(data);

		// Reset the form after submission is finished
		reset();
	};
	return (
		// <FormProvider>
		<form onSubmit={handleSubmit(onFormSubmit)} className='card-body'>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						register,
						errors,
					});
				}
				return child;
			})}
		</form>
		// </FormProvider>
	);
};

export const InputField = ({ label, name, register, errors, ...props }) => (
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

const PasswordInput = ({ name, register, errors, label }) => {
	const [show, setShow] = useState(false);

	return (
		<div className='form-control relative'>
			<label className='my-2'>
				<span className='label-text font-figtree'>{label}</span>
			</label>
			<input
				type={show ? "text" : "password"}
				{...register(name)}
				className='input input-bordered'
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
const ConfirmPasswordInput = ({ name, register, errors, label }) => {
	const [show, setShow] = useState(false);

	return (
		<div className='form-control relative'>
			<label className='my-2'>
				<span className='label-text font-figtree'>{label}</span>
			</label>
			<input
				type={show ? "text" : "password"}
				{...register(name)}
				className='input input-bordered'
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

const SelectInput = ({ name, label, options, register, errors }) => (
	<div className='form-control'>
		<label>{label}</label>
		<select name={name} {...register(name)} className='select select-bordered'>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</select>

		{errors[name] && <p>{errors[name].message}</p>}
	</div>
);

const CheckboxInput = ({ name, label, register, errors }) => (
	<div className='form-control'>
		<label className='label justify-start gap-4'>
			<input type='checkbox' name={name} {...register(name)} />
			<span className='label-text'>{label}</span>
		</label>

		<span className='text-red-500 mt-1'>
			{errors[name] && <p>{errors[name].message}</p>}
		</span>
	</div>
);
const RadioInput = ({ name, options, register }) => (
	<div>
		{options.map((option) => (
			<label key={option.value}>
				<input type='radio' {...register(name)} value={option.value} />
				{option.label}
			</label>
		))}
	</div>
);
// const PasswordStrength = ({ password }) => {
// 	// logic to check strength
// 	return <div className={strength}>Strength:</div>;
// };

// const SubmitButton = ({ children }) => (
// 	<div className='form-control mt-6'>
// 		<button className='btn btn-accent'>{isSubmitting ? "..." : {children}}</button>
// 	</div>
// );
export const SubmitButton = ({ children }) => {
	// const {
	// 	formState: { isSubmitting },
	// } = useFormContext(); // Access form state from context

	return (
		<div className='form-control mt-6'>
			<button className='btn btn-accent' type='submit'>
				{/* {isSubmitting ? "..." : children} */}
				{children}
			</button>
		</div>
	);
};

Form.InputField = InputField;
Form.SubmitButton = SubmitButton;
Form.SelectInput = SelectInput;
Form.CheckboxInput = CheckboxInput;
Form.RadioInput = RadioInput;
Form.PasswordInput = PasswordInput;
Form.ConfirmPasswordInput = ConfirmPasswordInput;

export default Form;
