#!/usr/bin/env node

// import from build-in package
const fs = require("fs");
const path = require("path");
const jsonFile = require("jsonfile");

const print = require("./inc/print");
const genOutput = require("./inc/gen-output");
const write = require("./inc/write");
const mkdir = require("./inc/mkdir");
const cpFiles = require("./inc/cp-files");

// declare variables
let projectName, sourceFolder, outputFolder, containerId, hostUrl, isHelp, isDependenciesInstruct;
let inputFile;

// get arguments
if (process.argv.indexOf("-p") !== -1) {
	projectName = process.argv[process.argv.indexOf("-p") + 1];
	// remove trailling slash
	projectName = projectName.replace(/[\/\\]+/g, "");
}
if (process.argv.indexOf("-s") !== -1) {
	sourceFolder = process.argv[process.argv.indexOf("-s") + 1];
	// make sure sourceFolder does exist
	if(!doesFolderPathExist(sourceFolder)) {
		console.log("Source path is not correct.");
		console.log("Exit");
		return;
	}
	// get absolute path instead
	sourceFolder = path.resolve(sourceFolder);
}
if (process.argv.indexOf("-o") !== -1) {
	outputFolder = process.argv[process.argv.indexOf("-o") + 1];
	// make sure outputFolder does exist
	if(!doesFolderPathExist(outputFolder)) {
		console.log("Output path doesn't exist.");
		console.log("Exit");
		return;
	}
	// get absolute path instead
	outputFolder = path.resolve(outputFolder);
	// create sub folder for output files
	outputFolder = outputFolder + "/gwd-to-component-output";
}
if (process.argv.indexOf("-c") !== -1) {
	containerId = process.argv[process.argv.indexOf("-c") + 1];
}
if (process.argv.indexOf("-u") !== -1) {
	hostUrl = process.argv[process.argv.indexOf("-u") + 1];
	// remove trailling slash
	hostUrl = hostUrl.replace(/(\/+)$/g, "");
}
if (process.argv.indexOf("-h") !== -1 || process.argv.indexOf("--help") !== -1) {
	isHelp = true;
}
if (process.argv.indexOf("-d") !== -1 ) {
	isDependenciesInstruct = true;
}

// if users need help, print help
if (isHelp) {
	print.help();
	return;
}

// if users need instruction to load dependencies correctly
if (isDependenciesInstruct) {
	print.dependenciesInstruct();
	return;
}

// check if all required arguments are defined
if (!projectName || !sourceFolder || !outputFolder || !containerId  || !hostUrl) {
	print.error();
	return false;
}

// Start Program
init();

function init() {
	console.log("\t Starting");
	readInputFile();
}

function doesFolderPathExist(path) {
	return fs.lstatSync(path).isDirectory() ? true : false;
}

// read input file (Google Web Designer output)
function readInputFile() {
	// default file is index.html
	inputFile = sourceFolder + "/index.html";
	console.log(`\t Reading file from ${inputFile}`);
	fs.readFile(inputFile, "utf8", function (err, indexHTMLInput) {
		if (err) {
			return console.log(err);
		}
		console.log("\t Done. Reading file finished");
		generateOutputFiles(indexHTMLInput);
	});
}

// generate new output so that new output can be used as a we component
function generateOutputFiles(indexHTMLInput) {
	
	// Make subdirectory named 'gwd-to-component' and 'gwd-to-component/dependencies'
	mkdir.mkdirIfNotExists(`${outputFolder}`);
	mkdir.mkdirIfNotExists(`${outputFolder}/${projectName}`);
	mkdir.mkdirIfNotExists(`${outputFolder}/${projectName}/.dependencies`);
	mkdir.mkdirIfNotExists(`${outputFolder}/${projectName}/${containerId}`);

	// generate output index.html file
	generateIndexHTML(indexHTMLInput);

	// copy dependencies to project folder
	copyDependencies();

	// copy other files, such as images, audio or video, to project folder
	copyOtherFiles();

	// generate dependencies.json
	generateDependenciesJSON(indexHTMLInput);
	
}

function generateIndexHTML(indexHTMLInput) {
	// Generate HTML to memory
	const htmlOutput = genOutput.indexHTML(indexHTMLInput, containerId, getHostUrl(hostUrl), projectName);
	// create HTML output file
	write.write(htmlOutput, `${outputFolder}/${projectName}/${containerId}/index.html`);
}

// Get hostUrl from `.dependencies.json`. Fallback to -u option if .dependencies.json doesn't exist
function getHostUrl(defaultHostUrl) {
	if(fs.existsSync(`${outputFolder}/${projectName}/.dependencies.json`)) {
		const dependenciesJSON = jsonFile.readFileSync(`${outputFolder}/${projectName}/.dependencies.json`, { encoding: "utf8" });
		return dependenciesJSON.hostUrl;
	}
	return defaultHostUrl;
}

function copyDependencies() {
	fs.readdir(sourceFolder, function(err, allFilePaths) {
		const dependenciesRegex = /(\.js)|(\.css)$/i;
		let dependencyPaths = allFilePaths.filter(path => dependenciesRegex.test(path));
		dependencyPaths = dependencyPaths.map(path => `${sourceFolder}/${path}`);
		const dependencyFolders = `${outputFolder}/${projectName}/.dependencies`;
		cpFiles.recursiveCopy(dependencyPaths, dependencyFolders);
	});
}

function copyOtherFiles() {
	fs.readdir(sourceFolder, function(err, allFilePaths) {
		// get all files except *.js, *.css, *.html
		let otherFilesPath = allFilePaths.filter(path => {
			if((/\.js$/i).test(path) || (/\.css$/i).test(path) || (/\.html$/i).test(path)) {
				return false;
			} else {
				return true;
			}
		});
		// filename to absolute path
		otherFilesPath = otherFilesPath.map(path => `${sourceFolder}/${path}`);
		// copy files to project folder
		cpFiles.recursiveCopy(otherFilesPath, `${outputFolder}/${projectName}/${containerId}`);
	});
}

function generateDependenciesJSON(indexHTMLInput) {
	genOutput.dependenciesJSON(indexHTMLInput, projectName, outputFolder, containerId, getHostUrl(hostUrl));
}