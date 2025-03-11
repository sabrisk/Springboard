const pokedexUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0/";

document.addEventListener("DOMContentLoaded", async () => {
	async function getAllPokemon() {
		const response = await fetch(pokedexUrl);
		if (!response.ok) throw new Error("Failed to get list of all pokemon.");
		const responseJson = await response.json();
		return responseJson.results;
	}

	async function getPokemon(pokedex) {
		const randomIndex = Math.floor(Math.random() * pokedex.length);

		const response = await fetch(pokedex[randomIndex].url);
		if (!response.ok) throw new Error("Failed to get pokemon.");
		const responseJson = await response.json();

		return responseJson;
	}

	async function getSpecies(speciesUrl) {
		const response = await fetch(speciesUrl);
		if (!response.ok) throw new Error("Failed to get pokemon species.");
		const responseJson = await response.json();

		return responseJson;
	}

	async function getThreePokemon(pokedex) {
		const pokeArr = [];
		try {
			for (let i = 0; i < 3; i++) {
				const pokemon = await getPokemon(pokedex);
				const species = await getSpecies(pokemon.species.url);

				for (const entry of species.flavor_text_entries) {
					if (entry.language["name"] === "en") {
						displayPokemon(
							pokemon.name,
							entry["flavor_text"],
							pokemon.sprites.front_default
						);
						break;
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function getOnePokemon(pokedex) {
		const pokeArr = [];
		try {
			const pokemon = await getPokemon(pokedex);
			const species = await getSpecies(pokemon.species.url);

			for (const entry of species.flavor_text_entries) {
				if (entry.language["name"] === "en") {
					displayPokemon(
						pokemon.name,
						entry["flavor_text"],
						pokemon.sprites.front_default
					);
					break;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function displayPokemon(name, description, url) {
		const card = document.createElement("div");
		card.className = "card";
		card.width;

		const pName = document.createElement("p");
		pName.className = "name";
		pName.textContent = name;

		const image = document.createElement("img");
		image.className = "image";
		image.src = url;

		const pDescription = document.createElement("p");
		pDescription.className = "description";
		pDescription.textContent = description;

		card.appendChild(pName);
		card.appendChild(image);
		card.appendChild(pDescription);

		document.getElementById("container").append(card);
	}

	try {
		const pokedex = await getAllPokemon();
		document.getElementById("pokeBtn").addEventListener("click", () => {
			getOnePokemon(pokedex);
		});
	} catch (error) {
		console.log(error);
	}
});
