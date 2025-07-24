import { useEffect, useState } from "react";

import PlanetCard from "../PlanetCard/PlanetCard";
import Loader from "../../../components/Loader/Loader";

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

			if (!spacecraft || !originPlanet) {
				setSelectedPlanetId("");
				setSelectedSpacecraftId("");
				return;
			}

			// Only send spacecraft to different planet
			if (originPlanet.id !== selectedPlanetId) {
				dispatch(
					sendSpacecraftToPlanet({
						spacecraftId: selectedSpacecraftId,
						originPlanetId: originPlanet.id,
						targetPlanetId: selectedPlanetId,
						capacity: spacecraft.capacity,
					})
				);
				// Don't dispatch and clear selections in state if it is the same planet
			} else {
				setSelectedPlanetId("");
				setSelectedSpacecraftId("");
			}
		}
	}, [selectedPlanetId, selectedSpacecraftId, dispatch]);

	useEffect(() => {
		if (sendSpacecraftStatus === "succeeded") {
			setSelectedPlanetId("");
			setSelectedSpacecraftId("");
		}
	}, [sendSpacecraftStatus]);

	const updateSpacecraftLocation = (spacecraftId, planetId) => {};

	let content;
	if (planetsStatus === "loading") {
		content = <Loader />;
	} else if (planetsStatus === "succeeded") {
		content = planets.map((planet) => (
			<PlanetCard
				key={planet.id}
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

	return (
		<div className={styles.pageBody}>
			{content}
			{sendSpacecraftStatus === "loading" && <Loader />}
		</div>
	);
};

export default PlanetsList;
