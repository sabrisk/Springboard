import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
	const [dots, setDots] = useState([]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDots((currDots) => {
				if (currDots.length === 5) {
					return [];
				} else {
					return [...currDots, <p>.</p>];
				}
			});
		}, 300);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className={styles.loader}>
			<p>Loading</p>
			{dots}
		</div>
	);
};

export default Loader;
