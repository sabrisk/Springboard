import { useEffect } from "react";

import PlanetCard from "../PlanetCard/PlanetCard";

import { useSelector, useDispatch } from "react-redux";
import {
	getPlanets,
	selectAllPlanets,
	selectPlanetsStatus,
	selectPlanetsError,
} from "../planetsSlice";

import styles from "./PlanetsList.module.css";

const PlanetsList = () => {
	const dispatch = useDispatch();
	const planets = useSelector(selectAllPlanets);
	const planetsStatus = useSelector(selectPlanetsStatus);
	const planetsError = useSelector(selectPlanetsError);

	useEffect(() => {
		if (planetsStatus === "idle") {
			dispatch(getPlanets());
		}
	}, [planetsStatus, dispatch]);

	let content;
	console.log("status", planetsStatus);
	if (planetsStatus === "loading") {
		content = <p>"Loading..."</p>;
	} else if (planetsStatus === "succeeded") {
		content = planets.map((planet) => <PlanetCard {...planet} />);
		// content = planets.map((planet) => <div>{planet.name}</div>);
	} else if (planetsStatus === "failed") {
		content = <p>{planetsError}</p>;
	}

	return <div className={styles.pageBody}>{content}</div>;
};

export default PlanetsList;
