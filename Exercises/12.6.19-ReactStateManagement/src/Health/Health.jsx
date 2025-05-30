import "./Health.css";

const Health = ({ name, health, color }) => {
	const getEmoji = () => {
		if (health === 100) {
			return "💖";
		} else if (health > 0) {
			return "💔";
		} else {
			return "💀";
		}
	};

	return (
		<section className="Health">
			<p style={{ color }}>
				{name} Health: {health} {getEmoji()}
			</p>
		</section>
	);
};

export default Health;
