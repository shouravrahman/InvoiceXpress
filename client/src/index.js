import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Theme } from "react-daisyui";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";

// import MainLayout from "./layouts/MainLayout";

// import "@fontsource-variable/inter";
// import Home from "./pages/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <Provider store={store}> */}
		<Theme dataTheme='synthwave'>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Theme>
		{/* </Provider> */}
	</React.StrictMode>
);
