import ConstructionForm from "../features/construction/ConstructionForm";
import BackButton from "../components/BackButton/BackButton";

import styles from "./Construction.module.css";

const Construction = () => {
	return (
		<div className={styles.construction}>
			<div className={styles.pageHeader}>
				<BackButton />
			</div>

			<ConstructionForm />
		</div>
	);
};

export default Construction;
