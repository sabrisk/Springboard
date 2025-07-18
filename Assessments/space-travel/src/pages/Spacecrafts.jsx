import ActionButton from "../components/ActionButton/ActionButton";

import styles from "./Spacecrafts.module.css";

const Spacecrafts = () => {
	return (
		<div className={styles.spacecrafts}>
			<div className={styles.pageHeader}>
				{<ActionButton name="Build a Spacecraft" emoji="🏗️" />}
			</div>
		</div>
	);
};

export default Spacecrafts;
