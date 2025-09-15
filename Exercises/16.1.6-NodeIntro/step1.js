const fs = require("fs");

const cat = (path) => {
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(data.toString());
	});
};
if (!process.argv[2]) {
	console.log("No arguments passed.");
	process.exit(1);
}
cat(process.argv[2]);
