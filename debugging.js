#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function mkdirIfNotExists(filePath) {
	filePath = path.resolve(filePath);
	console.log(`processing ${filePath}`);
	if (!fs.existsSync(filePath)){
		fs.mkdirSync(filePath);
	}
}

if(!process.argv[2]) {
	console.log(`\t\t Error occured. Please supply direname`);
	return;
}

mkdirIfNotExists(process.argv[2]);