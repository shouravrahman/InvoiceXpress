import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "The MERN Stack Solution for Invoices and Quotes",
	description:
		"The MERN Stack Solution for Invoices and Quotes using docker nginx",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
