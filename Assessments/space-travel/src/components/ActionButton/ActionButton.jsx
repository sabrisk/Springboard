import { useNavigate } from "react-router-dom";

import styles from "./ActionButton.module.css";

const ActionButton = ({ name, emoji, path, actionFunc, isSubmit = false }) => {
	const navigate = useNavigate();

	const handleClick = async (e) => {
		if (!isSubmit) {
			e.preventDefault();
		}

		if (actionFunc) {
			const value = await actionFunc();
		}

		if (path) {
			navigate(path);
		}
	};

	return (
		<button
			className={styles.button}
			type={isSubmit ? "submit" : "button"}
			onClick={handleClick}
		>
			{emoji} {name}
		</button>
	);
};

export default ActionButton;
