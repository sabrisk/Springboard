import ActionButton from "../components/ActionButton/ActionButton";
import SpacecraftCard from "../features/spacecrafts/SpacecraftCard/SpacecraftCard";

import styles from "./Spacecrafts.module.css";

const spacecrafts = [
	{
		imageURL:
			"https://c7.alamy.com/comp/C0DW8G/artists-concept-of-a-space-shuttle-entering-earth-orbit-C0DW8G.jpg",
		name: "Space Shuttle",
		capacity: 10000,
	},
	{
		imageURL:
			"https://c7.alamy.com/comp/C0DW8G/artists-concept-of-a-space-shuttle-entering-earth-orbit-C0DW8G.jpg",
		name: "Space Shuttle",
		capacity: 10000,
	},
	{
		imageURL:
			"https://c7.alamy.com/comp/C0DW8G/artists-concept-of-a-space-shuttle-entering-earth-orbit-C0DW8G.jpg",
		name: "Space Shuttle",
		capacity: 10000,
	},
	{
		imageURL:
			"https://c7.alamy.com/comp/C0DW8G/artists-concept-of-a-space-shuttle-entering-earth-orbit-C0DW8G.jpg",
		name: "Space Shuttle",
		capacity: 10000,
	},
];

const Spacecrafts = () => {
	return (
		<div className={styles.spacecrafts}>
			<div className={styles.pageHeader}>
				<ActionButton name="Build a Spacecraft" emoji="🏗️" />
			</div>
			<div className={styles.pageBody}>
				{spacecrafts.map((craft) => (
					<SpacecraftCard {...craft} />
				))}
			</div>
		</div>
	);
};

export default Spacecrafts;
