import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import styles from "./RootLayout.module.css";

const RootLayout = () => {
	return (
		<div className={styles.rootLayout}>
			<header className={styles.header}>
				<NavBar />
			</header>
			<main className={styles.mainContent}>
				<Outlet />
				<Footer />
			</main>
		</div>
	);
};

export default RootLayout;
