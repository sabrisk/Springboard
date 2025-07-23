import styles from "./EntityDetails.module.css";

const EntityDetails = ({ labels, size = "medium", showLabels = true }) => {
	const entitySizes = {
		small: ".8em",
		medium: ".9em",
		large: "1.2em",
	};

	return (
		<div
			className={styles.entityDetails}
			style={{ fontSize: entitySizes[size] }}
		>
			{labels.map(
				({ nameLabel, nameValue, amountLabel, amountValue }, index) => (
					<div className={styles.labels} key={index}>
						<p>
							{showLabels && nameLabel}
							{nameValue}
						</p>
						<p>
							{showLabels && amountLabel}
							{amountValue}
						</p>
					</div>
				)
			)}
		</div>
	);
};

export default EntityDetails;
