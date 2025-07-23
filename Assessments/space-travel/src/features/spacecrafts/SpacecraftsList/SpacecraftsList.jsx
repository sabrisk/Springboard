import { useEffect } from "react";

import SpacecraftCard from "../SpacecraftCard/SpacecraftCard";

import { useSelector, useDispatch } from "react-redux";
import {
	getSpacecrafts,
	selectAllSpacecrafts,
	selectSpacecraftsStatus,
	selectSpacecraftsError,
} from "../spacecraftsSlice";

import styles from "./SpacecraftsList.module.css";

const SpacecraftsList = () => {
	const dispatch = useDispatch();
	const spacecrafts = useSelector(selectAllSpacecrafts);
	const spacecraftsStatus = useSelector(selectSpacecraftsStatus);
	const spacecraftsError = useSelector(selectSpacecraftsError);

	useEffect(() => {
		if (spacecraftsStatus === "idle") {
			dispatch(getSpacecrafts());
		}
	}, [spacecraftsStatus, dispatch]);

	let content;
	if (spacecraftsStatus === "loading") {
		content = <p>"Loading..."</p>;
	} else if (spacecraftsStatus === "succeeded") {
		content = spacecrafts.map((craft) => (
			<SpacecraftCard {...craft} key={craft.id} />
		));
	} else if (spacecraftsStatus === "failed") {
		content = <p>{spacecraftsError}</p>;
	}

	return <div className={styles.pageBody}>{content}</div>;
};

export default SpacecraftsList;
