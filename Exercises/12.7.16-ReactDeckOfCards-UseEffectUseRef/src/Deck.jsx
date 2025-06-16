import { useState, useEffect, useRef } from "react";
import Card from "./Card.jsx";
import "./Deck.css";

const Deck = () => {
	const [deckId, setDeckId] = useState(null);
	const [cards, setCards] = useState([]);
	const [remaining, setRemaining] = useState(null);
	const [isShuffling, setIsShuffling] = useState(false);

	const intervalRef = useRef(null);
	const cardsRef = useRef([]);
	const remainingRef = useRef(null);

	// Keep refs in sync with state
	useEffect(() => {
		cardsRef.current = cards;
	}, [cards]);

	useEffect(() => {
		remainingRef.current = remaining;
	}, [remaining]);

	const startDrawing = () => {
		if (intervalRef.current === null) {
			intervalRef.current = setInterval(() => {
				drawCard();
			}, 1000);
		}
	};

	const stopDrawing = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	// Clear interval on unmount
	useEffect(() => {
		return () => {
			clearInterval(intervalRef.current);
		};
	}, []);

	useEffect(() => {
		async function getDeckId() {
			try {
				const response = await fetch(
					"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (!data.success || !data.deck_id) {
					throw new Error(data.error || "Invalid deck response");
				}

				setDeckId(data.deck_id);
				setRemaining(data.remaining);
			} catch (err) {
				console.error("Failed to get deck ID:", err);
			}
		}
		getDeckId();
	}, []);

	const drawCard = async () => {
		if (!deckId) {
			console.warn("No deck ID available");
			return;
		}

		if (remainingRef.current === 0) {
			alert("No more cards!");
			stopDrawing();
			return;
		}

		try {
			const response = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (!data.success || !data.cards?.length) {
				throw new Error(data.error || "Invalid draw response");
			}

			const newCard = {
				code: data.cards[0].code,
				img: data.cards[0].images.png,
				visible: true,
				transformStyle: getCardStyle(),
			};

			setCards((prev) => [...prev, newCard]);
			setRemaining(data.remaining);
		} catch (err) {
			console.error("Failed to draw card:", err);
		}
	};

	const shuffleDeck = async () => {
		setIsShuffling(true);
		if (!deckId) {
			console.warn("No deck ID available");
			return;
		}

		try {
			const response = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || "Shuffle failed");
			}

			setCards([]);
			setRemaining(data.remaining);
		} catch (err) {
			console.error("Failed to shuffle deck:", err);
		} finally {
			setIsShuffling(false);
		}
	};

	const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

	const getCardStyle = () => {
		if (remainingRef.current < 52) {
			const translationX = Math.floor(Math.random() * 30) * randomSign();
			const translationY = Math.floor(Math.random() * 30) * randomSign();
			const rotation =
				(Math.floor(Math.random() * 60) - 20) * randomSign();

			return {
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: `translate(-50%, -50%) translateX(${translationX}px) translateY(${translationY}px) rotate(${rotation}deg)`,
			};
		}
		return {};
	};

	return (
		<div className="Deck">
			<div className="button-area">
				<button
					type="button"
					onClick={!intervalRef.current ? startDrawing : stopDrawing}
					disabled={
						!deckId ||
						remaining === 0 ||
						remaining === null ||
						isShuffling
					}
				>
					{!intervalRef.current ? "Start Drawing" : "Stop Drawing"}
				</button>
				<button
					type="button"
					onClick={shuffleDeck}
					disabled={isShuffling}
				>
					Shuffle
				</button>
			</div>
			<div className="card-area">
				{cards.map((card) => (
					<Card
						key={card.code}
						img={card.img}
						transformStyle={card.transformStyle}
					/>
				))}
			</div>
		</div>
	);
};

export default Deck;
