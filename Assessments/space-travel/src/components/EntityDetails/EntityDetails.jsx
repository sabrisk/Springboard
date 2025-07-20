import styles from "./EntityDetails.module.css";

const EntityDetails = ({ labels, showLabels = true }) => {
	return (
		<div className={styles.entityDetails}>
			{labels.map(
				({ nameLabel, nameValue, amountLabel, amountValue }) => (
					<>
						<p>
							{showLabels && nameLabel}
							{nameValue}
						</p>
						<p>
							{showLabels && amountLabel}
							{amountValue}
						</p>
					</>
				)
			)}

			{/* <p>
				{showLabels && "Name: "}
				{name}
			</p>
			<p>
				{showLabels && "Capacity: "}
				{amount}
			</p> */}
		</div>
	);
};

export default EntityDetails;
