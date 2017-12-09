// import from build-in package
const fs = require("fs");
const path = require("path");

const print = require("./inc/print");
const genOutput = require("./inc/gen-output");


// declare variables
let sourceFolder, containerId, linkImportId, hostUrl, isHelp;
let inputFile;

// get arguments
if (process.argv.indexOf("-s") !== -1) {
	sourceFolder = process.argv[process.argv.indexOf("-s") + 1];
	// make sure sourceFolder is correct
	if(!ifSourcePathCorrect(sourceFolder)) {
		console.log("Source path is not correct.");
		console.log("Exit");
		return;
	}
	// remove trailling slash
	sourceFolder = sourceFolder.replace(/(\/+)$/g, "");	
}
if (process.argv.indexOf("-c") !== -1) {
	containerId = process.argv[process.argv.indexOf("-c") + 1];
}
if (process.argv.indexOf("-l") !== -1) {
	linkImportId = process.argv[process.argv.indexOf("-l") + 1];
}
if (process.argv.indexOf("-u") !== -1) {
	hostUrl = process.argv[process.argv.indexOf("-u") + 1];
	// remove trailling slash
	hostUrl = hostUrl.replace(/(\/+)$/g, "");
}
if (process.argv.indexOf("-h") !== -1 || process.argv.indexOf("--help") !== -1) {
	isHelp = true;
}

// if users need help, print help
if (isHelp) {
	print.help();
	return;
}

// check if all required arguments are defined
if (!sourceFolder || !containerId || !linkImportId  || !hostUrl) {
	print.error();
	return false;
}

// Start Program
init();

function init() {
	console.log("Starting");
	readInputFile();
}

function ifSourcePathCorrect(path) {
	return fs.lstatSync(path).isDirectory() ? true : false;
}

// read input file (Google Web Designer output)
function readInputFile() {
	// default file is index.html
	inputFile = path.resolve(sourceFolder) + "/index.html";
	console.log(`Reading file from ${inputFile}`);
	fs.readFile(inputFile, "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}
		console.log("Reading file finish");
		generateNewOutputFile(data);
	});
}

// generate new output so that new output can be used as a we component
function generateNewOutputFile(data) {
	console.log("Generating new output file...");
	const htmlOutput = genOutput.gen(data, containerId, linkImportId, hostUrl);
	console.log("Generated HTML is now in memory");
	writeOutputFile(htmlOutput);
}

// override to index.html file
function writeOutputFile(htmlOutput) {
	console.log(`Overriding generated HTML to ${inputFile} ...`);
	// override input file with new generated HTML output
	fs.writeFile(inputFile, htmlOutput, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`Overriding successfully please check it at ${inputFile}`);
	}); 
}