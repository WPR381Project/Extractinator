const decompress = require("decompress");
 const path = require("path");
 const fs = require("fs");

// Decompress Single file
function DecompressFile(dir, dirout) {
  (async () => {
      try {
          const files = await decompress(dir, dirout, {
            // filter: file => path.extname(file.path) !== ".exe"
          });
          console.log(files);
      } catch (error) {
          console.log(error);
      }
  })();
}

// Decompress entire directory
function Decompress(dir) {
  // Decompressing root files
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        if (path.extname(file) == '.zip') {
          DecompressFile(dir + '/' + file, dir + '/' + file.split('.').slice(0, -1).join('.')); // Creates the filepath dynamically depending on what file it is currently at
        }
    });
  });

  // Decompressing subfiles recursively after 500ms, Timeout is used to ensure that all files are done 
  // decompressing before looping though them
  setTimeout(function() {fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      if (path.extname(file) == '') {
        fs.readdir(dir + '/' + file, (err, filesa) => {
          filesa.forEach(fileb => {
            if (path.extname(fileb) == '.zip') {
              DecompressFile(dir + '/' + file + '/' + fileb, dir + '/' + file + '/' + fileb.split('.').slice(0, -1).join('.')); // Creates the filepath dynamically depending on what file it is currently at
            }
          });
        })
      }
    });
  })}, 500);
}

// Exporting
module.exports = {
  Decompress
}