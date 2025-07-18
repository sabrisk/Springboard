import styles from "./ActionButton.module.css";

const ActionButton = ({ name, emoji }) => {
	return (
		<button className={styles.button}>
			{emoji} {name}
		</button>
	);
};

export default ActionButton;
