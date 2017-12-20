const fs = require("fs");
const path = require("path");

exports.recursiveCopy = function(filePaths, targetFolder) {
    filePaths.forEach(filePath => {
        const fileName = path.basename(filePath);
        const targetPaht = targetFolder + "/" + fileName;
        console.log(`\t Copying a file to ${targetPaht}`);
        copyFile(filePath, targetPaht, function () {
            console.log(`\t Done. Copy file ${targetPaht} finished`);
        });
    });
};

function copyFile(source, target, cb) {
    var cbCalled = false;
    var readStream = fs.createReadStream(source);
    readStream.on("error", function (err) {
        done(err);
    });
    var writeStream = fs.createWriteStream(target);
    writeStream.on("error", function (err) {
        done(err);
    });
    writeStream.on("close", function (ex) {
        done();
    });
    readStream.pipe(writeStream)
    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}