import { NavLink } from "react-router-dom";
import styles from "./SpacecraftButton.module.css";

const thumbnailSizes = {
	small: { x: 50, y: 50 },
	medium: { x: 75, y: 75 },
	large: { x: 100, y: 100 },
};

const SpacecraftButton = ({
	id,
	path = "",
	size = "small",
	pictureUrl,
	selectedSpacecraftId,
	setSelectedSpacecraftId,
}) => {
	const { x, y } = thumbnailSizes[size];
	return (
		<NavLink
			to={path}
			onClick={() => {
				setSelectedSpacecraftId(id);
			}}
			className={`${styles.spacecraftButton} ${
				selectedSpacecraftId === id ? styles.selected : ""
			}`}
		>
			<img
				className={styles.thumbnail}
				src={pictureUrl}
				alt=""
				width={x}
				height={y}
			/>
		</NavLink>
	);
};

export default SpacecraftButton;
