# Google Web Designer to Web Component

## Introduction

Convert your GWD project to web component easily with single command line and embed your awesome GWD component in HTML5 way  to any website you want.

## Code Samples

To use this package just run this command line.

`
	gwd-to-component -p my-project -s /path/to/gwd/output -o /your/prefered/output -c container-id -u http://yourwebsite.com
`

This package will create a new folder named `gwd-to-component-output` in the folder that your specified as `-o (output folder)` argument and create new folder with the same name as your `-p (project name)`.

once you ran the above command, you can upload the project folder to website. Then place your component on your main web page like this.

`<div id="gwd-${myContainerId}"></div>`

and then add `link` tag just below the component. Please don't forget to add `id` attribute. The code will look like this

`<link id="gwd-${myContainerId}-source" rel="import" href="http://yourwebsite.com/my-project/container-id/index.html">`

## Installation

This package is a NPM package. Before using this package be sure to install Node.js. 

> npm install -g gwd-to-component

and you are good to go.

## How to use this GWD-to-component.

1. Create a new Project in Google Web Desginer.
2. Do some fun stuffs.
3. Click at `File` > `Publish` > `Locally` .
4. Make sure only `Polite downloading` and `Groups Unpacking` are checked.
5. Run the command mentioned above to make Google Web Designer embedable as a web component. Make sure your `-s (source folder path)` is the same path as exported directory from step 4.
6. Upload the your project folder to your website. If you upload to the root folder of your website, your project folder will be accessiable at `http://yourwebsite.com/project-name`.
7. Use the command `gwd-to-component -d` to print out all dependencies that your project depends on. Just copy and paste to `HEAD` tag of your main web page.
8. On your main webpage, add these 2 line of code `<div id="gwd-${yourContainerId}"></div>` and `<link id="gwd-${yourContainerId}-source" rel="import" href="http://yourwebsite.com/project-name/component-name/index.html">`. It's important that `link` tag must be added after all dependencies and your component container.
9. Have fun.

## Command line reference

> `-s` is Source folder from Google Web Designer output without trailling slash.

> `-o`  is Output folder generated from this package without trailling slash. The Folder path you spacified must exists otherwise errors will occure. This package will create subdirectory named `gwd-to-component-output` in that directory. for example if you spacify `/my/output` as an output folder, sub folder will be created at `/my/output/gwd-to-component-output`

> `-p`  is Your desired project name. Please name the project with lower-case letters and not special charecters included.This package will create new folder under "gwd-to-component-output" folder. Your project name will be used as the folder name, for example `/my/output/gwd-to-component-output/project-name`. One project is intended for one website to embed.

> `-c` is your preferred `contianerId` to populate component. This will create new component folder the same name as your `containerId` inside your project folder, for example `/my/output/gwd-to-component-output/project-name/containerId`. After you ran the command and uploaded project folder to your website, you can add the embeded code on your main web page like this `<div id="gwd-${yourContainerId}"></div>` and `<link id="gwd-${yourContainerId}-source" rel="import" href="http://yourwebsite.com/project-name/container-id/index.html">`.

> `-u` is host URL that will host your project folder including http or https and port without trailling slash. If you decide to host your components on "Github Page" then host URL might be `https://username.github.io/repository` and upload your project folder to the root folder of your repository. This option will be ommited if `.dependencies.json` exists as we want every component in the project has the same host URL.

> `-d` is All dependencies that you have to load into your main page. just copy and paste in your `head` tag

> `-h` | --help for documentation

## How it works
### For index.html file and dependencies
1. This package remove all dependencies code, both scripts and links (`<scripts src="..."></scripts>` and `<link href="..."/>`), as we want to add all dependencies manully in `HEAD` tag of main page.
2. Log all dependencies files in `.dependencies.json` instead. The command `gwd-to-component -d` will read this file.
3. Copy `index.html` to component folder(inside project folder) and copy all dependencies to `.dependencies` folder(inside project folder).
4. Add a bit of code to `index.html` to make this file embedable as a web component.
### For all media files such as images and audio files.
1. This package rewrite relative source path, for example `/my-image.png`, to URL based on your `-u`, `-p` and `-c` option. For example if you provide `http://username.github.io/repository` as `-u` argument, `myproject` as `-p` argument and `my-component` as `-c` argument, then the source path will be rewrited as `http://username.github.io/repository/myproject/my-component/my-image.png`.
2. Copy all media files to component folder(indeide project folder) -- the same folder as `index.html` file.


## If you got some bugs
This package is really new so it's not possible to have a perfect package in just few releases. If you did ran in to some bugs please [Report on Git repository](https://github.com/aptarmy/gwd-to-component/issues)