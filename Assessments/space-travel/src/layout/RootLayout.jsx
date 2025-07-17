import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./RootLayout.module.css";

const RootLayout = () => {
	return (
		<div className={styles.rootLayout}>
			<Header className />
			<main className={styles.mainContent}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
