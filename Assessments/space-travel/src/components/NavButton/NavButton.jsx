import { NavLink } from "react-router-dom";
import styles from "./NavButton.module.css";

const NavButton = ({ path, emoji, name }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
			}
			to={path}
		>
			{emoji} {name}
		</NavLink>
	);
};

export default NavButton;
