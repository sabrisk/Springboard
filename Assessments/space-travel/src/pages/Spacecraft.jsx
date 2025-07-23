import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SpacecraftButton from "../components/SpacecraftButton/SpacecraftButton";
import EntityDetails from "../components/EntityDetails/EntityDetails";
import Loader from "../components/Loader/Loader";

import placeholderImg from "../../images/placeholder-thumb.png";

import { selectAllSpacecrafts } from "../features/spacecrafts/spacecraftsSlice";

import styles from "./Spacecraft.module.css";

const Spacecraft = () => {
	const { id } = useParams();
	const spacecrafts = useSelector(selectAllSpacecrafts);
	const spacecraft = spacecrafts.find((craft) => id === craft.id);

	const imgSrc =
		spacecraft?.pictureUrl && spacecraft.pictureUrl.trim() !== ""
			? spacecraft.pictureUrl
			: placeholderImg;

	const labels = [
		{
			nameLabel: "Name: ",
			nameValue: spacecraft?.name,
			amountLabel: "Capacity: ",
			amountValue: spacecraft?.capacity,
		},
	];

	return (
		<div>
			<div className={styles.pageHeader}>
				{spacecraft && (
					<SpacecraftButton
						size="xLarge"
						pictureUrl={imgSrc}
						clickable={false}
					/>
				)}
			</div>
			<div className={styles.pageBody}>
				<div className={styles.details}>
					{spacecraft && (
						<EntityDetails
							labels={labels}
							size="large"
							showLabels={true}
						/>
					)}
				</div>
				<div className={styles.details}>
					{spacecraft ? (
						<p className={styles.description}>Description</p>
					) : null}
					{spacecraft && (
						<p className={styles.descriptionDetails}>
							{spacecraft.description}
						</p>
					)}
				</div>
			</div>
			{!spacecraft && <Loader />}
		</div>
	);
};

export default Spacecraft;
