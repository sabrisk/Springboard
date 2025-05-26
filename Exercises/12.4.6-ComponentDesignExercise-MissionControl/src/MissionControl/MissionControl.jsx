import { useState } from "react";
import MissionCard from "../MissionCard/MissionCard";
import MissionFilter from "../MissionFilter/MissionFilter";
import MissionAction from "../MissionAction/MissionAction";
import "./MissionControl.css";

const MissionControl = ({ missions }) => {
	const [allMissions, setAllMissions] = useState(missions);
	const [currentFilter, setCurrentFilter] = useState(null); // or maybe "All"

	const filteredMissions = currentFilter
		? allMissions.filter((mission) => mission.status === currentFilter)
		: allMissions;

	const updateMission = (id, status) => {
		console.log(id, status);
		setAllMissions((prevMission) =>
			prevMission.map((mission) =>
				mission.id === id ? { ...mission, status } : mission
			)
		);
	};

	const setFilter = (status) => {
		setCurrentFilter(status);
	};

	return (
		<div className="mission-control">
			<h1>Space Mission Control</h1>
			<MissionFilter setFilter={setFilter} />

			{filteredMissions.map((mission) => {
				return (
					<MissionCard key={mission.id} {...mission}>
						<MissionAction
							missionId={mission.id}
							updateMission={updateMission}
						/>
					</MissionCard>
				);
			})}
		</div>
	);
};

export default MissionControl;
