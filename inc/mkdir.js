const fs = require("fs");
const path = require("path");

exports.mkdirIfNotExists = function(folderPaht) {
	folderPaht = path.resolve(folderPaht);
	console.log(`\t creating subdirectory if not exists "${folderPaht}"`);
	if (!fs.existsSync(folderPaht)){
		fs.mkdirSync(folderPaht);
		console.log(`\t Done. Output folder was created at "${folderPaht}"`);
	} else {
		console.log(`\t Done. Output folder already exists at "${folderPaht}"`);
	}
};