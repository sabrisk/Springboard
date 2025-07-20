import { useEffect } from "react";

import SpacecraftCard from "../SpacecraftCard/SpacecraftCard";

import { useSelector, useDispatch } from "react-redux";
import {
	selectAllSpacecrafts,
	getSpacecraftsStatus,
	getSpacecrafts,
	getSpacecraftsError,
} from "../spacecraftsSlice";

import styles from "./SpacecraftsList.module.css";

const SpacecraftsList = () => {
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

	return <div className={styles.pageBody}>{content}</div>;
};

export default SpacecraftsList;
