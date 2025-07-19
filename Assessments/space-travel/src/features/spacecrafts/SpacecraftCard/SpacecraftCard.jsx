import styles from "./SpacecraftCard.module.css";
import SpacecraftButton from "../SpacecraftButton/SpacecraftButton";
import SpacecraftDetails from "../SpacecraftDetails/SpacecraftDetails";
import ActionButton from "../../../components/ActionButton/ActionButton";

const SpacecraftCard = ({ pictureUrl, name, capacity }) => {
	return (
		<div className={styles.spaceCraftCard}>
			<SpacecraftButton size="medium" imageURL={pictureUrl} />
			<SpacecraftDetails name={name} capacity={capacity} />
			<div className={styles.action}>
				<ActionButton emoji={"💥"} name="Destroy" />
			</div>
		</div>
	);
};

export default SpacecraftCard;
