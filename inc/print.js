const fs = require("fs");
const jsonFile = require("jsonfile");

exports.error = function() {
    console.error(`
\t Error occured. Please supply all required arguments. Try typing
\t\t gwd-to-component -h | --help
\t for documentation of this package
    `);
}

exports.dependenciesInstruct = function() {
    const dependenciesFile = "./.dependencies.json";
    if(fs.existsSync(dependenciesFile)) {
        const dependenciesJSON = jsonFile.readFileSync(dependenciesFile, { encoding: "utf8" });
        console.log("\t Append below code to HEAD tag of your main page.");
        console.log("\t Script.");
        console.log("\t ==============================");
        dependenciesJSON.scripts.forEach(script => console.log(script));
        console.log("\t Style.");
        console.log("\t ==============================");
        dependenciesJSON.links.forEach(link => console.log(link));
    } else {
        return console.log("\t This is not gwd-to-component project.");
    }
}

exports.help = function() {
    console.log(`
    _______  _     _  ______     _______  _______    _______  _______  __   __  _______  _______  __    _  _______  __    _  _______ 
    |       || | _ | ||      |   |       ||       |  |       ||       ||  |_|  ||       ||       ||  |  | ||       ||  |  | ||       |
    |    ___|| || || ||  _    |  |_     _||   _   |  |       ||   _   ||       ||    _  ||   _   ||   |_| ||    ___||   |_| ||_     _|
    |   | __ |       || | |   |    |   |  |  | |  |  |       ||  | |  ||       ||   |_| ||  | |  ||       ||   |___ |       |  |   |  
    |   ||  ||       || |_|   |    |   |  |  |_|  |  |      _||  |_|  ||       ||    ___||  |_|  ||  _    ||    ___||  _    |  |   |  
    |   |_| ||   _   ||       |    |   |  |       |  |     |_ |       || ||_|| ||   |    |       || | |   ||   |___ | | |   |  |   |  
    |_______||__| |__||______|     |___|  |_______|  |_______||_______||_|   |_||___|    |_______||_|  |__||_______||_|  |__|  |___|  
    

\t "GWT To Component" is a standalone package intended for those who want to use Google Web Designer as a web component.

\t Command Pattern.
\t gwd-to-component -p myproject01 -s /path/to/gwd-output/ -o /path/to/output -c container-id -l link-import-id -u http://yourhosting/components/widget-1

\t Arguments reference.
\t -s \t is Source folder from Google Web Designer output without trailling slash.
\t -o \t is Output folder generated from this package without trailling slash. The Folder path you spacified must exists
\t\t otherwise errors will occure. This package will create subdirectory named "gwd-to-component-output" in that directory.
\t\t for example if you spacify "/my/output" as an output folder, sub folder will be created at "/my/output/gwd-to-component"
\t -p \t is Your desired project name. Please name the project with lower-case latters and not special charecter included.
\t\t This package will create new folder under "gwd-to-component-output" folder. Your project name will be used as folder name.
\t -c \t is Your preferred container ID which you can use as a component on your webpage so that you can use this HTML code
\t\t <div id="my-container-id"></div>
\t -l \t is your preferred LINK id (HTML DOM ID) which you will use to import the component to your webpage. On your
\t\t webpage use this HTML code <link id="my-link-id" rel="import" href="/gdw/output/path/index.html">
\t -u \t is host URL that will host your project folder including http or https and port without trailling slash.
\t\t If you decide to host your components on "Github Page" then host URL might be "https://username.github.io/repository"
\t\t and upload your project folder to the root folder of your repository. This option will be ommited if ".dependencies.json"
\t\t exists as we want every component in the project has the same host URL.
\t -d is All dependencies that you have to load in to your main page. just copy and paste in your "head" tag.

\t\t For full documenation please go to my Github at https://github.com/aptarmy/gwd-to-component

\t\t If you find some errors or bugs please report issues at https://github.com/aptarmy/gwd-to-component/issues.
\t\t I will come fix as soon as possible :)
    `);
}