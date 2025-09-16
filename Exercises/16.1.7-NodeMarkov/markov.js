/** Textual markov chain generator */

export class MarkovMachine {
	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.chains = {};
		this.sentenceStartWords = {};
		this.makeChains();
	}

	makeChains() {
		this.words.forEach((word, i) => {
			const prevWord = this.words[i - 1];
			if (
				i > 0 &&
				prevWord &&
				(prevWord.slice(prevWord.length - 1) === "." ||
					prevWord.slice(prevWord.length - 1) === "!" ||
					prevWord.slice(prevWord.length - 1) === "?")
			) {
				this.sentenceStartWords[word] = true;
			}

			this.chains[word] =
				this.chains[word] === undefined
					? [this.words[i + 1]]
					: [...this.chains[word], this.words[i + 1]];
		});
	}

	makeText(numWords = 100) {
		let wordCtr = 1;

		const keys = Object.keys(this.sentenceStartWords);
		const randomIndex = Math.floor(Math.random() * keys.length);
		const randomKey = keys[randomIndex];

		let currentWord = randomKey;

		console.log(currentWord);
		let text = currentWord + " ";

		while (wordCtr < numWords) {
			const keyValueArr = this.chains[currentWord];
			const keyValueArrRandIdx = Math.floor(
				Math.random() * keyValueArr.length
			);
			if (keyValueArr[keyValueArrRandIdx] === undefined) continue;
			if (
				(currentWord.slice(currentWord.length) === "." ||
					currentWord.slice(currentWord.length) === "!" ||
					currentWord.slice(currentWord.length) === "?") &&
				!this.sentenceStartWords[keyValueArr[keyValueArrRandIdx]]
			)
				continue;
			text += keyValueArr[keyValueArrRandIdx] + " ";
			currentWord = keyValueArr[keyValueArrRandIdx];
			wordCtr++;
		}
		console.log(text);
	}
}
