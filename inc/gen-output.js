// this script will be embeded in new output (index.js)
// to make the output accessible as a web component

const fs = require("fs");
const jsonFile = require("jsonfile");

exports.indexHTML = function(html, containerId, importLinkId, hostUrl, projectName) {
	console.log("\t Generating output to memory");

	// add srcipt for web component to work
	let script = `
		<script>
			// style
			var importDoc = document.currentScript.ownerDocument;
			var styles = importDoc.querySelectorAll('style');
			styles.forEach(style => {
				document.head.appendChild(style);
			});
			// populate component
			var container = document.getElementById("container-id");
			var link = document.getElementById("import-link-id");
			container.appendChild(link.import.querySelector("gwd-doubleclick"));
		</script>
	`;
	script = script.replace("container-id", containerId);
	script = script.replace("import-link-id", importLinkId);
	html = html.replace(/document\.(?!body)/g, "document.currentScript.ownerDocument.");
	html = html.replace("</body>", `${script}</body>`);

	// remove dependencies(<script src="..."></script>) as we want users to add it manually in main webpage
	html = html.replace(/<script[^>]+src=["'][^"']+["'][^>]*>[\s\t\n]*<\/script>[\s\t\n]*/g, "");
	html = html.replace(/<link[^>]+href=["'][^"']+["'][^>]*>[\s\t\n]*/g, "");

	// fix image source in HTML output to point to new url on server
	html = html.replace(/(<img[^>]+source=["'])([^"']+)(["'][^>]*>)/gi, `$1${hostUrl}/${projectName}/${containerId}/$2$3`);

	console.log("\t Done. Generated output is now in memory");

	return html;
};

exports.dependenciesJSON = function(indexHTMLInput, projectName, outputFolder, containerId, hostUrl) {

	// create dependencies.json if file not exists
	console.log("\t Check if dependencies.json file already exists");
	if(!fs.existsSync(`${outputFolder}/${projectName}/.dependencies.json`)) {
		console.log(`\t Creating new file : ${outputFolder}/${projectName}/.dependencies.json`);
		const emptyFileContent = { scripts: [], links: [], hostUrl };
		jsonFile.writeFileSync(`${outputFolder}/${projectName}/.dependencies.json`, emptyFileContent, { encoding: "utf8", spaces: 4 });
	} else { console.log("No need to create dependencies.json file"); }

	// edit <script> and <link/> reference to local server
	indexHTMLInput = indexHTMLInput.replace(/(<script[^>]+src=["'])((?!https?:\/\/)[^"']+)(["'][^>]*>)/gi,			`$1${hostUrl}/${projectName}/.dependencies/$2$3`);
	indexHTMLInput = indexHTMLInput.replace(/(<script[^>]+data-source=["'])((?!https?:\/\/)[^"']+)(["'][^>]*>)/gi,	`$1${hostUrl}/${projectName}/.dependencies/$2$3`);
	indexHTMLInput = indexHTMLInput.replace(/(<link[^>]+href=["'])((?!https?:\/\/)[^"']+)(["'][^>]*>)/gi,			`$1${hostUrl}/${projectName}/.dependencies/$2$3`);

	// extract dependencies (<script src="..."></script> or <link rel="stylesheet" href="..">) to dependencies.json
	// script
	const dependScriptRegex = /<script[^>]+src=["'][^"']+["'][^>]*>[\s\t\n]*<\/script>/gi;
	const dependenciesScripts = indexHTMLInput.match(dependScriptRegex);
	// style
	const dependLinksRegex = /<link[^>]+href=["'][^"']+["'][^>]*>/gi;
	const dependenciesLinks = indexHTMLInput.match(dependLinksRegex);

	// read dependencies.json
	console.log("\t Reading dependencies.json file");
	const dependenciesJSON = jsonFile.readFileSync(`${outputFolder}/${projectName}/.dependencies.json`, { encoding: 'utf8' });
	
	// write dependencies.json
	dependenciesJSON.scripts = [ ...new Set([...dependenciesScripts, ...dependenciesJSON.scripts])];
	dependenciesJSON.links =  [ ...new Set([...dependenciesLinks, ...dependenciesJSON.links])];
	jsonFile.writeFileSync(`${outputFolder}/${projectName}/.dependencies.json`, dependenciesJSON, { encoding: "utf8", spaces: 4 });

};