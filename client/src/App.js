import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";

function App() {
	return (
		<div className='w-full h-100vh flex items-center justify-center'>
			<MainLayout>
				<Home />
			</MainLayout>
		</div>
	);
}

export default App;
