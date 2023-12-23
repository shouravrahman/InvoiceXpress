import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const RegisterForm = () => {
	return (
		<form className='card-body '>
			<div className='form-control'>
				<label className='label'>
					<span className='label-text'>Full Name</span>
				</label>
				<input
					type='fname'
					placeholder='Full Name'
					className='input input-bordered'
					required
				/>
			</div>
			<div className='form-control'>
				<label className='label'>
					<span className='label-text'>Email</span>
				</label>
				<input
					type='email'
					placeholder='email'
					className='input input-bordered'
					required
				/>
			</div>
			<div className='form-control'>
				<label className='label'>
					<span className='label-text'>Password</span>
				</label>
				<input
					type='password'
					placeholder='password'
					className='input input-bordered'
					required
				/>
				<div className='form-control'>
					<label className='label'>
						<span className='label-text'>Company Name</span>
					</label>
					<input
						type='company'
						placeholder='Company Name'
						className='input input-bordered'
						required
					/>
				</div>
				<label className='label'>
					<a href='#' className='label-text-alt link link-hover'>
						Forgot password?
					</a>
				</label>
			</div>
			<div className='form-control mt-6'>
				<button className='btn btn-accent'>Login</button>
			</div>
		</form>
	);
};

export default RegisterForm;
