import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

function BackButton() {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(-1)} className={styles.button}>
			Go Back <span className={styles.emoji}>👈</span>
		</button>
	);
}

export default BackButton;
