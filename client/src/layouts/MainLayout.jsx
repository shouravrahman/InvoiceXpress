import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const MainLayout = () => {
	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};
export default MainLayout;
