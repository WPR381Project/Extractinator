const decompress = require("decompress");

//Simple version:
 /*
 decompress("./archives/success.zip", "./extracted_files").then(files => {
     console.log("Extracted zip acrchive!");
 });
 */

 //More complex, error handling + filter to exclude file types:
 const path = require("path");

(async () => {

    try {
        const files = await decompress("./archives/success.zip", "./extracted_files", {
           // filter: file => path.extname(file.path) !== ".exe"
        });
        console.log(files);
    } catch (error) {
        console.log(error);
    }

})();