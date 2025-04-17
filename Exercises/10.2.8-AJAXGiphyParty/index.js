// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

const giphyForm = document.getElementById("giphyForm");
const searchInput = document.getElementById("search");
const gifContainer = document.getElementById("gifContainer");

document.getElementById("getGifBtn").addEventListener("click", getGif);
document
	.getElementById("removeImagesBtn")
	.addEventListener("click", removeGifs);
// giphyForm.addEventListener("submit", removeGifs);

function removeGifs(e) {
	const images = gifContainer.querySelectorAll("img");
	for (let image of images) {
		image.remove();
	}
}
async function getGif(e) {
	e.preventDefault();
	const keyword = searchInput.value;

	if (!keyword.length) return;
	const gifPromise = await fetch(
		`http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${keyword}&limit=20`
	);

	const gifJSON = await gifPromise.json();

	const imageElement = document.createElement("img");
	const randInx = Math.floor(Math.random() * 20);
	imageElement.src = gifJSON.data[randInx].images.downsized_medium.url;
	gifContainer.append(imageElement);

	searchInput.value = "";
}
// gifJSON.data[0].url;
