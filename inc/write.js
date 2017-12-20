const fs = require("fs");

exports.write = function(content, outputPath) {
	console.log(`\t Creating new file to ${outputPath}`);
	fs.writeFile(outputPath , content, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`\t Done. output File was created at ${outputPath}`);
	});
};