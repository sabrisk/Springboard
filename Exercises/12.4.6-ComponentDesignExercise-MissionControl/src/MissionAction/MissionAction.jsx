import "./MissionAction.css";
import { useEffect } from "react";

const MissionAction = ({ missionId, updateMission }) => {
	const handleClick = (status) => {
		updateMission(missionId, status);
	};

	return (
		<div className="mission-action">
			<button
				onClick={() => {
					handleClick("Active");
				}}
			>
				Launch
			</button>
			<button
				onClick={() => {
					handleClick("Completed");
				}}
			>
				Complete
			</button>
		</div>
	);
};

export default MissionAction;
