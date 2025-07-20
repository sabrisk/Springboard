import styles from "./PlanetCard.module.css";
// import SpacecraftButton from "../SpacecraftButton/SpacecraftButton";
import EntityDetails from "../../../components/EntityDetails/EntityDetails";

import { useDispatch } from "react-redux";

const thumbnailSizes = {
	small: { x: 50, y: 50 },
	medium: { x: 75, y: 75 },
	large: { x: 100, y: 100 },
};

const PlanetCard = ({ id, name, currentPopulation, pictureUrl }) => {
	const dispatch = useDispatch();

	const labels = [
		{
			nameLabel: "Name: ",
			nameValue: name,
			amountLabel: "Population: ",
			amountValue: currentPopulation,
		},
	];

	// const labels = [{ nameValue: name, amountValue: currentPopulation }];

	const { x, y } = thumbnailSizes["medium"];
	return (
		<div className={styles.planetCard}>
			{/* <SpacecraftButton size="medium" imageURL={pictureUrl} /> */}
			{/* <div>{pictureUrl}</div> */}
			<div className={styles.planetInfo}>
				<img src={pictureUrl} alt="" width={x} height={y} />
				<div className={styles.details}>
					<EntityDetails labels={labels} showLabels={false} />
				</div>
			</div>
		</div>
	);
};

export default PlanetCard;
