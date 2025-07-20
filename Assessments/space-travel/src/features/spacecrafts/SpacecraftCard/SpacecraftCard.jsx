import styles from "./SpacecraftCard.module.css";
import SpacecraftButton from "../SpacecraftButton/SpacecraftButton";
import EntityDetails from "../../../components/EntityDetails/EntityDetails";
import ActionButton from "../../../components/ActionButton/ActionButton";

import { destroySpacecraftById } from "../spacecraftsSlice";

import { useDispatch } from "react-redux";

const SpacecraftCard = ({ id, name, capacity, pictureUrl }) => {
	const dispatch = useDispatch();

	const labels = [
		{
			nameLabel: "Name: ",
			nameValue: name,
			amountLabel: "Capacity: ",
			amountValue: capacity,
		},
	];

	return (
		<div className={styles.spaceCraftCard}>
			<SpacecraftButton size="medium" imageURL={pictureUrl} />
			<EntityDetails labels={labels} />
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
