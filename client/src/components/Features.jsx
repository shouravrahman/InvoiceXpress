import React, { useState } from "react";
import { Button } from "react-daisyui";

const TabContent = ({ img, href, details, headline }) => {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center p-4 gap-12'>
			<section className='flex-1'>
				<img
					src={img}
					alt={headline}
					className='max-w-full h-auto object-cover '
				/>
			</section>
			<section className='flex flex-col flex-[0.5] justify-center items-start h-full gap-6'>
				<h1 className='text-2xl font-semibold'>{headline}</h1>
				<p className='text-lg'>{details}</p>
				<Button className='btn-info mt-2' href={href}>
					Check out all our features ➡
				</Button>
			</section>
		</div>
	);
};
const tabs = [
	{
		name: "Quotes",
		link: "",
		content: (
			<TabContent
				headline='Quotes'
				details='Quotes
Ensure that your customers are on board with your prices before you start billing them. Send quotes including discounts for your customers approval, then convert them to projects or invoices.'
				href='/'
				img='/quotes.webp'
			/>
		),
	},
	{
		name: "Time Tracking",
		link: "",
		content: (
			<TabContent
				headline='Time Tracking'
				details='Effortlessly track time and bill your clients for the hours you spend on their projects. Simply start the timer from your mobile, computer, or Apple Watch whenever you start work—Zoho Invoice will log every billable minute in a clear calendar format.'
				href='/'
				img='/timetracking.webp'
			/>
		),
	},
	{
		name: "Expense Tracking",
		link: "",
		content: (
			<TabContent
				headline='Expense Tracking'
				details='Keep track of your unbilled expenses until theyre reimbursed by your clients. Zoho Invoice can autoscan your expense receipts and calculate your travel expenses based on GPS and mileage.'
				href='/'
				img='/expenses.webp'
			/>
		),
	},
	{
		name: "Customer Portal",
		link: "",
		content: (
			<TabContent
				headline='Customer Portal'
				details='Empower your customers with a self-service portal where they can view their invoices, check quotes, make payments, and more'
				href='/'
				img='/customerportal.webp'
			/>
		),
	},
	{
		name: "Dashboard",
		link: "",
		content: (
			<TabContent
				headline='Dashboard'
				details='Keep track of your business performance so you can make informed decisions. Check the dashboard to get quick insights through vibrant graphs and charts or run 30+ real-time business reports.'
				href='/'
				img='/dashboard.webp'
			/>
		),
	},
];

const Features = () => {
	return (
		<div className='w-screen flex flex-col  text-base justify-center items-center bg-base-200'>
			<h1 className='text-2xl md:text-4xl text-center p-1 mt-12 md:mt-16'>
				Everything you need for your business's billing process ⬇
			</h1>

			<div className='bg-base-200 w-full my-4 md:my-8'>
				<TabsComponent />
			</div>
		</div>
	);
};

export default Features;

function TabsComponent() {
	const [openTab, setOpenTab] = useState("Quotes");

	return (
		<div className='container mx-auto'>
			<div className='flex flex-wrap flex-col items-center justify-center py-8 md:py-20 px-6 md:px-10'>
				<ul className='flex flex-wrap space-x-2 gap-4 cursor-pointer'>
					{tabs.map((tab, i) => (
						<li key={tab.name}>
							<div
								onClick={() => setOpenTab(tab.name)}
								className={`${
									openTab === tab.name
										? "bg-accent text-base-300"
										: "bg-[#1a103c] text-base"
								} inline-block px-4 py-2 text-base rounded shadow`}
							>
								{tab.name}
							</div>
						</li>
					))}
				</ul>
				<div className='p-2 md:p-5 mt-8 md:mt-20 bg-[#1a103c] rounded text-base max-w-5xl w-full'>
					{tabs.map((tab) => (
						<div
							key={tab.name}
							className={tab.name === openTab ? "block" : "hidden"}
						>
							{tab.content}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
