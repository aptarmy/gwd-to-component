# Google Web Designer to Web Component

## Introduction

Convert your GWD project to web component easily with single command line and embed your awesome GWD component in HTML5 way  to any website you want.

## Code Samples

To use this package just run this command line.

`gwd-to-component -s /path/to/gwd/output/folder -c container-id -l link-import-id -u http://yourhosting/components/widget-1`

> -s is Source folder from Google Web Designer output without trailling slash. This package will only parse index.html from the source folder.

> -c is your preferred container ID to populate component.

> -l is your preferred LINK id (HTML DOM ID) which you will use to import the component to your webpage. On your webpage use this HTML code `<link id="my-link-id" rel="import" href="/gdw/output/path/index.html">`

> -u is host url to the output folder including http or https and port without trailling slash

> -h | --help for documentation

This package will override index.html file from Google Web Designer output so make sure you copy GWD output folder
to another directory and then run a command using new location as a source folder

once you ran the above command upload, you can upload the output folder to web hosting. Then plaece `link` tag in the `head` tag. It will look like this

`<link rel="import" href="http://yourhosting.com/component/widget-1">`

and embed GWD web component anywhere on your website like this

`<div id="my-container-id"></div>`

## Installation

This package is a NPM package. Before using this package be sure to install Node.js. 

> npm install -g gwd-to-component

and you are good to go.

## How to export from Google Web Desginer

1. Create a new Project.
2. Do some fun stuffs.
3. Click at `File` > `Publish` > `Locally` .
4. Make sure only `Polite downloading` and `Groups Unpacking` are checked.
5. Copy exported folder to another place. This folder will contain all libraries (many JS files) and index.html
6. Run the command mentioned above to make Google Web Designer embedable as a web component. Use your copied folder as a `-s` argument.
7. Upload the output folder to hosting.
8. On your main webpage, add this 2 line of code `<div id="container-id"></div>` and `<link rel="import" href="http://yourhosting.com/components/widget-1">`
9. Have fun :)