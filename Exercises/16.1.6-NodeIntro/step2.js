const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(data.toString());
	});
};

const webCat = async (url) => {
	try {
		const response = await axios.get(url);
		console.log(response.data);
	} catch (err) {
		console.log(err.message);
	}
};

const arg = process.argv[2];

if (!arg) {
	console.log("No arguments passed.");
	process.exit(1);
}

if (arg.slice(0, 4) === "http") {
	webCat(arg);
} else {
	cat(arg);
}
