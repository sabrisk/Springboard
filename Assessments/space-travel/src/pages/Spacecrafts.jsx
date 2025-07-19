import { useEffect } from "react";

import ActionButton from "../components/ActionButton/ActionButton";
import SpacecraftCard from "../features/spacecrafts/SpacecraftCard/SpacecraftCard";

import { useSelector, useDispatch } from "react-redux";
import {
	selectAllSpacecrafts,
	getSpacecraftsStatus,
	getSpacecrafts,
	getSpacecraftsError,
} from "../features/spacecrafts/spacecraftsSlice";

import styles from "./Spacecrafts.module.css";

const Spacecrafts = () => {
	const dispatch = useDispatch();
	const spacecrafts = useSelector(selectAllSpacecrafts);
	const spacecraftsStatus = useSelector(getSpacecraftsStatus);
	const error = useSelector(getSpacecraftsError);

	useEffect(() => {
		if (spacecraftsStatus === "idle") {
			dispatch(getSpacecrafts());
		}
	}, [spacecraftsStatus, dispatch]);

	let content;
	console.log("status", spacecraftsStatus);
	if (spacecraftsStatus === "loading") {
		content = <p>"Loading..."</p>;
	} else if (spacecraftsStatus === "succeeded") {
		content = spacecrafts.map((craft) => <SpacecraftCard {...craft} />);
	} else if (spacecraftsStatus === "failed") {
		content = <p>{error}</p>;
	}

	return (
		<div className={styles.spacecrafts}>
			<div className={styles.pageHeader}>
				<ActionButton name="Build a Spacecraft" emoji="🏗️" />
			</div>
			<div className={styles.pageBody}>{content}</div>
		</div>
	);
};

export default Spacecrafts;
