import "./FireButton.css";

const FireButton = ({
	updateHealth,
	restartGame,
	minDamage = 0,
	maxDamage = 5,
	gameOver,
}) => {
	const handleClick = () => {
		if (gameOver) restartGame();
		else updateHealth(minDamage, maxDamage);
	};

	const buttonText = gameOver ? "Restart" : "Fire!";
	const buttonClass = gameOver ? "game-over" : "firing";

	return (
		<section className="FireButton">
			<button className={buttonClass} onClick={handleClick}>
				{buttonText}
			</button>
		</section>
	);
};

export default FireButton;
