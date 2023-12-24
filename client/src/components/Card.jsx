import React from "react";
import { Button } from "react-daisyui";

const Card = () => {
	return (
		<div className='max-w-6xl mx-auto p-6 md:p-10 w-full'>
			<div className='card card-side flex-col md:flex-row bg-[#7d6db3] shadow-xl gap-6'>
				<figure>
					<img src='privacy.svg' className='invert' alt='privacy' />
				</figure>
				<div className='card-body px-4 py-6'>
					<h1 className='card-title text-2xl font-figtree'>
						Free shouldn't mean compromising on privacy or security
					</h1>
					<p className='text-base text-gray-200'>
						Data security and privacy are the cornerstones of Invoice Express.
						Invoice Express is free, and we will never show you advertisements
						or sell your information.
					</p>
					<div className='card-actions mt-2'>
						<Button className='btn btn-accent text-base'>Sign up now</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
