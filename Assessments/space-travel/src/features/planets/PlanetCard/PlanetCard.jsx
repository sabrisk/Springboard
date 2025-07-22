import styles from "./PlanetCard.module.css";
import EntityDetails from "../../../components/EntityDetails/EntityDetails";
import SpacecraftButton from "../../spacecrafts/SpacecraftButton/SpacecraftButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAllSpacecrafts } from "../../spacecrafts/spacecraftsSlice";

const thumbnailSizes = {
	small: { x: 50, y: 50 },
	medium: { x: 75, y: 75 },
	large: { x: 100, y: 100 },
};

const getSpacecraftLabels = (craft) => {
	const spacecraftLabels = [
		{
			nameLabel: "Name: ",
			nameValue: craft.name,
			amountLabel: "Capacity: ",
			amountValue: craft.capacity,
		},
	];

	return spacecraftLabels;
};
const PlanetCard = ({ planet, selectedPlanetId, setSelectedPlanetId }) => {
	const dispatch = useDispatch();
	console.log("planet", planet);
	const spacecrafts = useSelector(selectAllSpacecrafts);
	console.log("spacecrafts", spacecrafts);

	const planetLabels = [
		{
			nameLabel: "Name: ",
			nameValue: planet.name,
			amountLabel: "Population: ",
			amountValue: planet.currentPopulation,
		},
	];

	const { x, y } = thumbnailSizes["medium"];

	const filteredSpacecrafts = spacecrafts.filter((craft) => {
		return craft.currentLocation === planet.id;
	});
	console.log(filteredSpacecrafts);

	return (
		<div className={styles.planetCard}>
			<div
				className={`${styles.planetInfo} ${
					selectedPlanetId === planet.id ? styles.selected : ""
				}`}
				onClick={() => {
					console.log("Setting selected ID:", planet.id);
					setSelectedPlanetId(planet.id);
				}}
			>
				<img src={planet.pictureUrl} alt="" width={x} height={y} />
				<div className={styles.details}>
					<EntityDetails labels={planetLabels} showLabels={false} />
				</div>
			</div>
			<div className={styles.spacecrafts}>
				{filteredSpacecrafts.map((craft) => (
					<div className={styles.spacecraftDetails}>
						<SpacecraftButton
							size="small"
							imageURL={craft.pictureUrl}
						/>
						<EntityDetails
							labels={getSpacecraftLabels(craft)}
							showLabels={false}
							size="small"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default PlanetCard;
