import PlanetsList from "../features/planets/PlanetsList/PlanetsList";

import styles from "./Planets.module.css";

const Planets = () => {
	return (
		<div className={styles.planets}>
			<PlanetsList />
		</div>
	);
};

export default Planets;
