exports.error = function() {
    console.error(`

Error occured. Please supply all required arguments. Try typing
    gwd-to-component -h | --help
for documentation of this package

    `);
}

exports.help = function() {
    console.log(`
..####...##...##..#####...........######...####............####....####...##...##..#####....####...##..##..######..##..##..######.
.##......##...##..##..##............##....##..##..........##..##..##..##..###.###..##..##..##..##..###.##..##......###.##....##...
.##.###..##.#.##..##..##............##....##..##..........##......##..##..##.#.##..#####...##..##..##.###..####....##.###....##...
.##..##..#######..##..##............##....##..##..........##..##..##..##..##...##..##......##..##..##..##..##......##..##....##...
..####....##.##...#####.............##.....####............####....####...##...##..##.......####...##..##..######..##..##....##...

\t This is a standalone package intended for those who want to use Google Web Designer as a web component.

\t Command Line reference
\t gwd-to-component -s /path/to/gwd/output/folder -c container-id -l link-import-id -u http://yourhosting/components/widget-1

\t -s \t is Source folder from Google Web Designer output without trailling slash. This package will only parse
\t\t index.html from the source folder.
\t -c \t is your preferred container ID which you can use as a component on your webpage so that you can use this HTML code
\t\t <div id="my-container-id"></div>
\t -l \t is your preferred LINK id (HTML DOM ID) which you will use to import the component to your webpage. On your
\t\t webpage use this HTML code <link id="my-link-id" rel="import" href="/gdw/output/path/index.html">
\t -u \t is host url to the output folder including http or https and port without trailling slash

\t This package will override index.html file from Google Web Designer output so make sure you copy GWD output folder
\t to another directory and then run a command using new location as a source folder
    `);
}