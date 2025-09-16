/** Command-line tool to generate Markov text. */
import fs from "fs";
import axios from "axios";
import { MarkovMachine } from "./markov.js";

const type = process.argv[2];
const path = process.argv[3];

if (!type || !path) {
	console.error("Missing arguments.");
	process.exit(1);
}

if (type === "file") {
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log("Could not read the file provided.");
			console.log(err.message);
			process.exit(1);
		}
		// console.log("the data:", data.toString());
		const mm = new MarkovMachine(data.toString());
		console.log(mm.chains);
		mm.makeText();
	});
}

if (type === "url") {
	try {
		const response = await axios.get(path);
		// console.log(response.data);
		const mm = new MarkovMachine(response.data.toString());
		mm.makeText();
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
}
