var file_system = require('fs');
var archiver = require('archiver');
const path = require('path');

var archive = archiver('zip');

archive.on('error', function(err){
    throw err;
});

const SubFolders = () => {
    return new Promise((resolve, reject) => {
        file_system.readdir('tozip', (err, files) => {
  
            for (let i = 0; i < files.length; i++) {
                if (path.extname(files[i]) != '') {
                
                }
                else 
                {
                    var currentArchive = archiver('zip');
                
                    var currentFile = file_system.createWriteStream('tozip/' + files[i] + '.zip');
                
                    currentArchive.pipe(currentFile);
                
                    currentArchive.directory('tozip/' + files[i], false);
                
                    currentArchive.finalize();
                
                    currentFile.close();
                }
            } 
        });
        resolve();
    })
}

const MainFolder = () => {
    return new Promise((resolve, reject) => {
        var output = file_system.createWriteStream('tozip.zip');

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        archive.pipe(output);

        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory('tozip', false);
                
        // append files from a sub-directory and naming it `new-subdir` within the archive
        archive.directory('subdir/', 'new-subdir');
                
        archive.finalize();
        resolve();
    })
}


(async () => {
    await SubFolders();
    await MainFolder();
})()