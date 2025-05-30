import "./GameStatus.css";

const GameStatus = ({ gameStatus }) => {
	const gameMessages = {
		playing: "Engage the enemy 🔥",
		draw: "It's a draw! 🤝 Both spacecraft have been neutralized.",
		win: "Congratulations! 😎💪 You've successfully defended your spacecraft!",
		loss: "Mission Failed. 😲 Your spacecraft has been defeated.",
	};

	return (
		<footer className="GameStatus">
			{gameMessages[gameStatus] || "Unknown game state 🚨"}
		</footer>
	);
};

export default GameStatus;
