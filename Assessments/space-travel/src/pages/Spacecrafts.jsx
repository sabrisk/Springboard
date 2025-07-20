import ActionButton from "../components/ActionButton/ActionButton";
import SpacecraftsList from "../features/spacecrafts/SpacecraftsList/SpacecraftsList";

import styles from "./Spacecrafts.module.css";

const Spacecrafts = () => {
	return (
		<div className={styles.spacecrafts}>
			<div className={styles.pageHeader}>
				<ActionButton
					name="Build a Spacecraft"
					emoji="🏗️"
					path="/spacecrafts/construction"
					isSubmit={false}
				/>
			</div>
			<SpacecraftsList />
		</div>
	);
};

export default Spacecrafts;
