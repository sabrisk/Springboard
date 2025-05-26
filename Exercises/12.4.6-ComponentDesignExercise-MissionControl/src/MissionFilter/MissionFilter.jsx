import MissionCard from "../MissionCard/MissionCard";
import "./MissionFilter.css";

const MissionFilter = ({ setFilter }) => {
	const statuses = ["All", "Planned", "Active", "Completed"];

	const handleFilterClick = (status) => {
		if (status === "All") status = null;
		setFilter(status);
	};

	return (
		<div className="mission-filter">
			{statuses.map((filter) => {
				return (
					<button
						key={filter}
						onClick={() => {
							handleFilterClick(filter);
						}}
					>
						{filter}
					</button>
				);
			})}
		</div>
	);
};

export default MissionFilter;
