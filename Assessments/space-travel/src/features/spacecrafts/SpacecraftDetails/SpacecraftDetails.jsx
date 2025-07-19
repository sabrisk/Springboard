import styles from "./SpacecraftDetails.module.css";

const SpacecraftDetails = ({ name, capacity, showLabels = true }) => {
	return (
		<div className={styles.spacecraftDetails}>
			<p>
				{showLabels && "Name: "}
				{name}
			</p>
			<p>
				{showLabels && "Capacity: "}
				{capacity}
			</p>
		</div>
	);
};

export default SpacecraftDetails;
