import styles from "./PlanetCard.module.css";
import EntityDetails from "../../../components/EntityDetails/EntityDetails";
import SpacecraftButton from "../../spacecrafts/SpacecraftButton/SpacecraftButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAllSpacecrafts } from "../../spacecrafts/spacecraftsSlice";
import placeholderImg from "../../../../images/placeholder-thumb.png";

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
const PlanetCard = ({
	planet,
	selectedPlanetId,
	setSelectedPlanetId,
	selectedSpacecraftId,
	setSelectedSpacecraftId,
}) => {
	const dispatch = useDispatch();
	const spacecrafts = useSelector(selectAllSpacecrafts);
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

	const planetImgSrc =
		planet?.pictureUrl && planet.pictureUrl.trim() !== ""
			? planet.pictureUrl
			: placeholderImg;

	return (
		<div className={styles.planetCard}>
			<div
				className={`${styles.planetInfo} ${
					selectedPlanetId === planet.id ? styles.selected : ""
				}`}
				onClick={() => {
					setSelectedPlanetId(planet.id);
				}}
			>
				<img src={planetImgSrc} alt="" width={x} height={y} />
				<div className={styles.details}>
					<EntityDetails labels={planetLabels} showLabels={false} />
				</div>
			</div>
			<div className={styles.spacecrafts}>
				{filteredSpacecrafts.map((craft) => {
					const craftImgSrc =
						craft.pictureUrl && craft.pictureUrl.trim() !== ""
							? craft.pictureUrl
							: placeholderImg;

					return (
						<div
							key={craft.id}
							className={styles.spacecraftDetails}
						>
							<SpacecraftButton
								id={craft.id}
								size="small"
								pictureUrl={craftImgSrc}
								selectedSpacecraftId={selectedSpacecraftId}
								setSelectedSpacecraftId={
									setSelectedSpacecraftId
								}
							/>
							<EntityDetails
								labels={getSpacecraftLabels(craft)}
								showLabels={false}
								size="small"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PlanetCard;
