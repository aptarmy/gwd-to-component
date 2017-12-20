# Google Web Designer to Web Component

## Introduction

Convert your GWD project to web component easily with single command line and embed your awesome GWD component in HTML5 way  to any website you want.

## Code Samples

To use this package just run this command line.

`
	gwd-to-component -s /path/to/gwd/output/folder -c container-id -l link-import-id -u http://yourhosting/components/widget-1
`

> -s is Source folder from Google Web Designer output without trailling slash.

> -o  is Output folder generated from this package without trailling slash. The Folder path you spacified must exists otherwise errors will occure. This package will create subdirectory named "gwd-to-component-output" in that directory. for example if you spacify "/my/output" as an output folder, sub folder will be created at "/my/output/gwd-to-component"

> -p  is Your desired project name. Please name the project with lower-case letters and not special charecters included.This package will create new folder under "gwd-to-component-output" folder. Your project name will be used as folder name. One project is intended for one website to embed.

> -c is your preferred container ID to populate component.

> -l is your preferred LINK id (HTML DOM ID) which you will use to import the component to your webpage. On your webpage use this HTML code `<link id="my-link-id" rel="import" href="/gdw/output/path/index.html">`

> -u is host URL that will host your project folder including http or https and port without trailling slash. If you decide to host your components on "Github Page" then host URL might be `https://username.github.io/repository` and upload your project folder to the root folder of your repository. This option will be ommited if `.dependencies.json` exists as we want every component in the project has the same host URL.

> -e is All libraries that you have to load in to your main page. just copy and paste in your `head` tag

> -h | --help for documentation

This package will create a new folder named `gwd-to-component-output` in your specified argument `-o (output folder)` and create new folder with the same name as your `-p (project name)`.

once you ran the above command, you can upload the project folder to web hosting. Then place `link` tag in the `head` tag. It will look like this

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
5. Run the command mentioned above to make Google Web Designer embedable as a web component. Make sure your `-s (source folder path)` is the same path as exported directory from step 4.
6. Upload the output folder to hosting.
7. On your main webpage, add this 2 line of code `<div id="container-id"></div>` and `<link rel="import" href="http://yourhosting.com/components/widget-1">`
8. Have fun :)

## If you got some bugs
This package is really new so it's not possible to have a perfect package in just few releases. If you did ran in to some bugs please [Report on Git repository](https://github.com/aptarmy/gwd-to-component/issues)