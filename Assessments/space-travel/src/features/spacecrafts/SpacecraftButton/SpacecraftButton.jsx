import { NavLink } from "react-router-dom";
import styles from "./SpacecraftButton.module.css";

const thumbnailSizes = {
	small: { x: 50, y: 50 },
	medium: { x: 75, y: 75 },
	large: { x: 100, y: 100 },
};

const SpacecraftButton = ({ size = "medium", imageURL }) => {
	const { x, y } = thumbnailSizes[size];

	return (
		<NavLink to="/" className={styles.spacecraftButton}>
			<img src={imageURL} alt="" width={x} height={y} />
		</NavLink>
	);
};

export default SpacecraftButton;
