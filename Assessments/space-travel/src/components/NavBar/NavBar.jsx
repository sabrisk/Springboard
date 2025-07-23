import AppNavLink from "../AppNavLink/AppNavLink";

import styles from "./NavBar.module.css";

const links = [
	{ name: "Home", emoji: "🌍", path: `/` },
	{ name: "Spacecrafts", emoji: "🚀", path: `/spacecrafts` },
	{ name: "Planets", emoji: "🪐", path: `/planets` },
];

const NavBar = () => {
	return (
		<nav className={styles.nav}>
			{links.map((link) => (
				<AppNavLink {...link} key={link.name} />
			))}
		</nav>
	);
};

export default NavBar;
