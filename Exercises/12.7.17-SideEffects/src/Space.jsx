import { useState, useEffect, useRef } from "react";
import Star from "./Star.jsx";
import "./Space.css";

const Space = () => {
	const [stars, setStars] = useState([]);
	const intervalRef = useRef(null);
	const STAR_SIZE = 22;

	const destroyStar = (id) => {
		setStars((prev) => prev.filter((star) => id !== star.id));
	};

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			createStar();
		}, 1000);

		return () => {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		};
	}, []);

	const createStar = () => {
		const star = {
			id: crypto.randomUUID(),
			xPos: getAxisPos("x"),
			yPos: getAxisPos("y"),
		};

		setStars((prev) => {
			return [...prev, star];
		});
	};
	const getAxisPos = (axis) => {
		return (
			((axis === "x" ? window.innerWidth : window.innerHeight) -
				STAR_SIZE) *
			Math.random()
		);
	};
	return (
		<div className="Space">
			{stars.map(({ id, xPos, yPos }) => (
				<Star
					key={id}
					id={id}
					xPos={xPos}
					yPos={yPos}
					destroyStar={destroyStar}
				/>
			))}
		</div>
	);
};

export default Space;
