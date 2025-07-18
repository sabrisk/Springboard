import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

// const BackButton = ({ path, emoji, name }) => {
// 	return (
// 		// <NavLink
// 		// 	className={({ isActive }) =>
// 		// 		isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
// 		// 	}
// 		// 	to={path}
// 		// >
// 		// 	{emoji} {name}
// 		// </NavLink>
// 		<button></button>
// 	);
// };

function BackButton() {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(-1)} className={styles.button}>
			Go Back 👈
		</button>
	);
}

export default BackButton;
