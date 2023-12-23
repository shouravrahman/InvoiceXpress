import React from "react";
import RegisterForm from "./RegisterForm";

const Hero = () => {
	return (
		/* <section>
				<h1>100% free online invoicing software for small businesses</h1>
				<h2>
					Invoice Express is an online invoicing software designed to help small
					businesses with invoicing and payment collection. It is simple,
					secure, and absolutely free.
				</h2>
				<div>
					<img src='video.png' alt='' />
				</div>
			</section>
         <section>
         
         
         </section> */
		<div className='hero bg-base-100 md:h-screen'>
			<div className='hero-content justify-center max-w-[100rem] h-full flex-col lg:flex-row gap-6 '>
				<div className='text-center lg:text-left p-4 flex-[0.7] flex flex-col items-baseline justify-start h-[80%]'>
					<h1 className='text-5xl font-bold'>
						100% free online invoicing software for small businesses
					</h1>
					<p className='py-8 pb-10 '>
						Invoice Express is an online invoicing software designed to help
						small businesses with invoicing and payment collection. It is
						simple, secure, and absolutely free.
					</p>
					<div>
						<img
							src='video.png'
							alt=''
							className='object-cover max-w-full h-auto'
						/>
					</div>
				</div>
				<div className='md:flex-1 bg-hero-pattern bg-no-repeat w-full'>
					<div className='card shadow-2xl grid bg-base-100 mx-auto w-[85%] md:w-[60%]'>
						<RegisterForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
