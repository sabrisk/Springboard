"use strict";

let deckId = "";
let cardCount = 1;

const getNewDeckId = async () => {
	const deckResponse = await fetch(
		"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
	);

	if (!deckResponse.ok) {
		throw new Error("Failed to get deck ID: " + deckResponse.status);
	}
	const deckData = await deckResponse.json();
	return deckData.deck_id;
};

async function getCardData(deckId) {
	const cardResponse = await fetch(
		`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
	);
	const cardData = await cardResponse.json();

	if (!cardData.success) {
		throw new Error("Deck is empty or API request to get card has failed.");
	}

	console.log(cardData);
	return {
		value: cardData.cards[0].value,
		suit: cardData.cards[0].suit,
		image: cardData.cards[0].image,
		remaining: cardData.remaining,
	};
}

async function drawCard() {
	try {
		if (!deckId) {
			deckId = await getNewDeckId();
		}
		const cardData = await getCardData(deckId);
		displayCard(cardData);
	} catch (error) {
		console.error("Error getting card:", error);
	}
}

function randomSign() {
	return Math.random() < 0.5 ? -1 : 1;
}

function displayCard(cardData) {
	if (!cardData.remaining) {
		const btn = document.getElementById("drawBtn");
		btn.remove();
	}
	const card = document.createElement("img");
	card.src = cardData.image;
	card.className = "card";

	card.style.transform = `translate(-50%, -50%)`;

	if (cardData.remaining < 51) {
		let translationX = Math.floor(Math.random() * 30) * randomSign();
		let translationY = Math.floor(Math.random() * 30) * randomSign();
		let rotation = (Math.floor(Math.random() * 60) - 20) * randomSign();
		card.style.transform = `translate(-50%, -50%) translateX(${translationX}px) translateY(${translationY}px) rotate(${rotation}deg)`;
	}
	console.log(card.style.transform);

	document.body.append(card);
}
