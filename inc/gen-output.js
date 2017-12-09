// this script will be embeded in new output (index.js)
// to make the output accessible as a web component

const { JSDOM } = require("jsdom");

exports.gen = function(html, containerId, importLinkId, hostUrl) {

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

	// fix image source in HTML output to point to new url on server
	const dom = new JSDOM(html);
	const doc = dom.window.document
	const images = doc.querySelectorAll("gwd-doubleclick img");
	images.forEach(image => {
		const formerSource = image.getAttribute("source");
		const newSource = `${hostUrl}/${formerSource}`;
		image.setAttribute("source", newSource);
	});
	// return HTML text from DOM
	html = dom.serialize();

	return html;
}