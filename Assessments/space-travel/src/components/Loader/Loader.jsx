import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
	const [dotCount, setDotCount] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDotCount((curr) => (curr >= 5 ? 0 : curr + 1));
		}, 300);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className={styles.loader}>
			<p>Loading</p>
			{Array.from({ length: dotCount }).map((_, i) => (
				<span key={i}>.</span>
			))}
		</div>
	);
};

export default Loader;
