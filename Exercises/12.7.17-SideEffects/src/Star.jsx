import "./Star.css";
import { useEffect, useRef } from "react";

const Star = ({ id, xPos, yPos, destroyStar }) => {
	const starRef = useRef(null);

	useEffect(() => {
		starRef.current?.focus();
	}, []);

	return (
		<div
			ref={starRef}
			onClick={() => destroyStar(id)}
			tabIndex={0}
			className="Star"
			style={{ position: "absolute", left: xPos, top: yPos }}
		>
			⭐
		</div>
	);
};
export default Star;
