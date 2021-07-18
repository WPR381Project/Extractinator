/*const decompress = require("decompress");
//Simple version:
 /*
 decompress("./archives/success.zip", "./extracted_files").then(files => {
     console.log("Extracted zip acrchive!");
 });
 */

 //More complex, error handling + filter to exclude file types:
 /*const path = require("path");
(async () => {
    try {
        const files = await decompress("./archives/success.zip", "./extracted_files", {
           // filter: file => path.extname(file.path) !== ".exe"
        });
        console.log(files);
    } catch (error) {
        console.log(error);
    }
})();*/

const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const decompress = require('decompress');
const fs = require('fs');
const path = require('path');
const { extname, basename, dirname } = require('path/posix');
const dirpath = "./project_folders";    // dirpath will be overwritten by user input


function extractZip(source, target) //This function is used to extract individual .zip archives
{
  (async () => {
    //var sourceParameter = path.format(source);
      try {
          const files = await decompress(source,target);
              //filter: file => path.extname(file.path) == ".zip";
          console.log(files);
      } catch (error) {
          console.log(error);
      }
  
  })();
}

  const unzipFiles = async function (dirPath) //The main function that will be called and exported to the main app
  {
    const files = fs.readdirSync(dirPath);  //This function generates the file paths to the zip archives
  
    await Promise.all(
      files.map(async (file) => 
      {
        setTimeout(() => {  // timeout is used because the app tried to extract files before the paths to them were created
          files.forEach(file => {
            console.log(file);       
          });
        }, 1000);
        
        if (fs.statSync(dirPath + "/" + file).isDirectory())  
        {
          
          await unzipFiles(dirPath + "/" + file);

        } else 
        {
          const target = dirPath;
          const folderName = basename(file);
          const source = (dirPath+"/"+folderName);  //sets directory to the individual.zip files
          console.log("fullFilePath : ("+target+")   \nfoldername : ("+folderName+")   \nsource :"+source); // Logs .zip files which will be extracted
          if (source.endsWith(".zip")) 
          {
            extractZip(source, target);
            setTimeout(() => {  // timeout is used because the app tried to extract files before the paths to them were created
              unzipFiles(target+"/"+basename(file));
            }, 1000);
            
          }
        }
      })
    );
  };
//extractZip("./project_folders/Num5.zip", "./project_folders")
unzipFiles(dirpath);
