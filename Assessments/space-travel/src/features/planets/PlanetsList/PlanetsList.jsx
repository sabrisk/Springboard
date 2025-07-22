import { useEffect, useState } from "react";

import PlanetCard from "../PlanetCard/PlanetCard";

import { useSelector, useDispatch } from "react-redux";
import {
	getPlanets,
	selectAllPlanets,
	selectPlanetsStatus,
	selectPlanetsError,
} from "../planetsSlice";

import {
	sendSpacecraftToPlanet,
	selectSendSpacecraftToPlanetStatus,
	selectAllSpacecrafts,
} from "../../spacecrafts/spacecraftsSlice";

import styles from "./PlanetsList.module.css";

const PlanetsList = () => {
	const dispatch = useDispatch();
	const [selectedPlanetId, setSelectedPlanetId] = useState("");
	const [selectedSpacecraftId, setSelectedSpacecraftId] = useState("");

	const spacecrafts = useSelector(selectAllSpacecrafts);
	const planets = useSelector(selectAllPlanets);
	const planetsStatus = useSelector(selectPlanetsStatus);
	const planetsError = useSelector(selectPlanetsError);

	const sendSpacecraftStatus = useSelector(
		selectSendSpacecraftToPlanetStatus
	);

	useEffect(() => {
		if (planetsStatus === "idle") {
			dispatch(getPlanets());
		}
	}, [planetsStatus, dispatch]);

	useEffect(() => {
		if (selectedPlanetId !== "" && selectedSpacecraftId !== "") {
			const spacecraft = spacecrafts.find(
				(craft) => craft.id === selectedSpacecraftId
			);

			const originPlanet = planets.find(
				(planet) => planet.id === spacecraft.currentLocation
			);

			dispatch(
				sendSpacecraftToPlanet({
					spacecraftId: selectedSpacecraftId,
					originPlanetId: originPlanet.id,
					targetPlanetId: selectedPlanetId,
					capacity: spacecraft.capacity,
				})
			);
		}
	}, [selectedPlanetId, selectedSpacecraftId, dispatch]);

	useEffect(() => {
		if (sendSpacecraftStatus === "succeeded") {
			setSelectedPlanetId("");
			setSelectedSpacecraftId("");
		}
	}, [sendSpacecraftStatus]);

	// if (selectedPlanetId && selectedSpacecraftId) {
	// 	//dispatch here
	// 	setSelectedPlanetId("");
	// 	setSelectedSpacecraftId("");
	// }

	const updateSpacecraftLocation = (spacecraftId, planetId) => {};

	let content;
	if (planetsStatus === "loading") {
		content = <p>"Loading..."</p>;
	} else if (planetsStatus === "succeeded") {
		content = planets.map((planet) => (
			<PlanetCard
				planet={planet}
				selectedPlanetId={selectedPlanetId}
				setSelectedPlanetId={setSelectedPlanetId}
				selectedSpacecraftId={selectedSpacecraftId}
				setSelectedSpacecraftId={setSelectedSpacecraftId}
			/>
		));
	} else if (planetsStatus === "failed") {
		content = <p>{planetsError}</p>;
	}

	return <div className={styles.pageBody}>{content}</div>;
};

export default PlanetsList;
