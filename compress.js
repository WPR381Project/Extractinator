var fs = require('fs');
var archiver = require('archiver');
const path = require('path');
const { timeout } = require('async');

function ZipFile(dir) {
    var output = fs.createWriteStream(dir + '.zip');
    var archive = archiver('zip');

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    archive.directory(dir, false);

    archive.finalize();
}

function DeleteFolders(dir) {
    fs.readdir(dir, (err, files) => {
        files.forEach(filez => {
            if (path.extname(filez) == '') {
                if( fs.existsSync(dir + '/' + filez) ) {
                    fs.readdirSync(dir + '/' + filez).forEach(function(file) {
                        var curPath = dir + '/' + filez + "/" + file;
                        if(fs.lstatSync(curPath).isDirectory()) { // recurse
                            deleteFolderRecursive(curPath);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    fs.rmdirSync(dir + '/' + filez);
                }
            }
        });
    });
}

function DeleteMain(dir) {
    if( fs.existsSync(dir) ) {
        fs.readdirSync(dir).forEach(function(file) {
            var curPath = dir + '/' + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }
}

function ZipAllFiles(dir) {
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            if (path.extname(file) == '') {
                ZipFile(dir + '/' + file);
            }
        });
    });

    setTimeout(function() {DeleteFolders(dir);}, 500);
    setTimeout(function() {ZipFile(dir);}, 1000);
    setTimeout(function() {DeleteMain(dir);}, 1500);
}

module.exports = {
    ZipAllFiles
}