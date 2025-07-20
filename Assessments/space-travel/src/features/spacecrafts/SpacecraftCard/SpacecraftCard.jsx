import styles from "./SpacecraftCard.module.css";
import SpacecraftButton from "../SpacecraftButton/SpacecraftButton";
import SpacecraftDetails from "../SpacecraftDetails/SpacecraftDetails";
import ActionButton from "../../../components/ActionButton/ActionButton";

import { destroySpacecraftById } from "../spacecraftsSlice";

import { useDispatch } from "react-redux";

const SpacecraftCard = ({ id, name, capacity, pictureUrl, destroy }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.spaceCraftCard}>
			<SpacecraftButton size="medium" imageURL={pictureUrl} />
			<SpacecraftDetails name={name} capacity={capacity} />
			<div className={styles.action}>
				<ActionButton
					actionFunc={() => {
						console.log("actionFunc", id);
						dispatch(destroySpacecraftById({ id }));
					}}
					emoji={"💥"}
					name="Destroy"
				/>
			</div>
		</div>
	);
};

export default SpacecraftCard;
