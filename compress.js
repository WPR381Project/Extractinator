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
