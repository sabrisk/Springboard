import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import styles from "./RootLayout.module.css";

const RootLayout = () => {
	return (
		<div className={styles.rootLayout}>
			<header>
				<NavBar />
			</header>
			<main className={styles.mainContent}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
