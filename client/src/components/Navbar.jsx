/* eslint-disable jsx-a11y/anchor-is-valid */
export const menuItems = [
	{ name: "Home", href: "#" },
	{
		name: "Features",
		href: "#",
		submenu: [
			{ name: "Submenu 1", href: "#" },
			{ name: "Submenu 2", href: "#" },
		],
	},
	{ name: "Pricing", href: "#" },
	{ name: "Login", href: "#" },
];

export const userMenuItems = [
	{ name: "Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Logout", href: "#" },
];

const Navbar = () => {
	return (
		<div className='navbar max-w-[100rem] bg-base-100 px-4 md:px-10 py-5'>
			{/* Mobile Menu */}
			<MobileMenu />

			{/* Logo and Main Button */}
			<div className='flex md:justify-normal flex-1'>
				<a href='/' className='cursor-pointer w-[50%] md:w-[30%]'>
					<img
						src='logo-trs.png'
						className='max-w-full h-auto object-cover'
						alt=''
					/>
				</a>
			</div>

			{/* Desktop Menu */}
			<DesktopMenu />

			{/* Search Bar and User Menu */}
			<div className='flex-none gap-2'>
				<SearchBar />
				<UserMenu />
			</div>
		</div>
	);
};

export default Navbar;

const DesktopMenu = () => (
	<div className='navbar-center hidden lg:flex flex-1'>
		<ul className='menu menu-horizontal px-1'>
			<MenuItems items={menuItems} />
		</ul>
	</div>
);

const MobileMenu = () => (
	<div className=''>
		<div className='dropdown'>
			<div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h8m-8 6h16'
					/>
				</svg>
			</div>
			<ul
				tabIndex={0}
				className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
			>
				<MenuItems items={menuItems} />
			</ul>
		</div>
	</div>
);
const SearchBar = () => (
	<div className='form-control hidden md:flex'>
		<input
			type='text'
			placeholder='Search'
			className='input input-bordered w-24 md:w-auto'
		/>
	</div>
);

const UserMenu = () => (
	<div className='dropdown dropdown-end'>
		<div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
			<div className='w-8 md:w-10 rounded-full'>
				<img
					alt='Tailwind CSS Navbar component'
					src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
				/>
			</div>
		</div>
		<ul className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
			{/* Menu items */}
			<MenuItems items={userMenuItems} />
		</ul>
	</div>
);

const MenuItems = ({ items }) => (
	<>
		{items.map((item, i) => (
			<li key={i} className='text-sm md:text-base'>
				{item.submenu ? (
					<details>
						<summary>{item.name}</summary>
						<ul className='p-2'>
							{item.submenu.map((subItem, subIdx) => (
								<li key={subIdx}>
									<a href={subItem.href}>{subItem.name}</a>
								</li>
							))}
						</ul>
					</details>
				) : (
					<a href={item.href}>{item.name}</a>
				)}
			</li>
		))}
	</>
);
