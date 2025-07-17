import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

const links = [
	{ name: "Home", emoji: "🌍", path: `/` },
	{ name: "Spacecrafts", emoji: "🚀", path: `/spacecrafts` },
	{ name: "Planets", emoji: "🪐", path: `/planets` },
];

const NavBar = () => {
	return (
		<nav className={styles.nav}>
			{links.map(({ name, emoji, path }) => (
				<NavLink
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.active}`
							: `${styles.link}`
					}
					to={path}
				>
					{emoji} {name}
				</NavLink>
			))}
		</nav>
	);
};

export default NavBar;
