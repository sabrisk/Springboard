import "./MissionCard.css";

const MissionCard = ({ children, name, status, crew }) => {
	return (
		<div className="mission-card">
			<div>
				<h3>{name}</h3>
				<p>Status: {status}</p>
				<p>Crew: {crew.join(", ")}</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default MissionCard;
