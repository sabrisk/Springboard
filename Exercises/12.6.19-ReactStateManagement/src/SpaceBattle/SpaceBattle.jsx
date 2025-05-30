import React, { useState, useEffect } from "react";
import "./SpaceBattle.css";
import Health from "../Health/Health.jsx";
import FireButton from "../FireButton/FireButton.jsx";
import GameStatus from "../GameStatus/GameStatus.jsx";

const SpaceBattle = () => {
	const [health, setHealth] = useState({ player: 100, enemy: 100 });

	const [gameStatus, setGameStatus] = useState("playing");
	const minDamage = 5;
	const maxDamage = 20;

	const updateHealth = (minDamage, maxDamage) => {
		const playerDamage = getRandomDamage(minDamage, maxDamage);
		const enemyDamage = getRandomDamage(minDamage, maxDamage);

		setHealth((prevHealth) => {
			return {
				player: Math.max(prevHealth.player - playerDamage, 0),
				enemy: Math.max(prevHealth.enemy - enemyDamage, 0),
			};
		});
	};

	const getRandomDamage = (minDamage, maxDamage) =>
		Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

	const updateGameState = (newPlayerHealth, newEnemyHealth) => {
		if (newPlayerHealth === 0 && newEnemyHealth === 0) {
			setGameStatus("draw");
		} else if (newEnemyHealth === 0) {
			setGameStatus("win");
		} else if (newPlayerHealth === 0) {
			setGameStatus("loss");
		}
	};

	const restartGame = () => {
		setGameStatus("playing");
		setHealth({ player: 100, enemy: 100 });
	};

	useEffect(() => {
		updateGameState(health.player, health.enemy);
	}, [health]);

	return (
		<div className="SpaceBattle">
			<header>
				<h1>Space Battle Simulator</h1>
			</header>
			<main>
				<Health
					name="Player"
					health={health.player}
					color="lightgreen"
				/>
				<FireButton
					updateHealth={updateHealth}
					restartGame={restartGame}
					minDamage={minDamage}
					maxDamage={maxDamage}
					gameOver={gameStatus !== "playing"}
				/>
				<Health name="Enemy" health={health.enemy} color="red" />
			</main>
			<GameStatus gameStatus={gameStatus} />
		</div>
	);
};
export default SpaceBattle;
