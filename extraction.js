const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const decompress = require('decompress');
const fs = require('fs');
const path = require('path');
const { extname, basename, dirname } = require('path/posix');
const dirpath = "./project_folders";


function extractZip(source, target)
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

  const unzipFiles = async function (dirPath) 
  {
    const files = fs.readdirSync(dirPath);
  
    await Promise.all(
      files.map(async (file) => 
      {
        setTimeout(() => {
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
          const source = (dirPath+"/"+folderName);
          console.log("fullFilePath : ("+target+")   \nfoldername : ("+folderName+")   \nsource :"+source);
          if (source.endsWith(".zip")) 
          {
            extractZip(source, target);
            setTimeout(() => {
              unzipFiles(target+"/"+basename(file));
            }, 1000);
            
          }
        }
      })
    );
  };
//extractZip("./project_folders/Num5.zip", "./project_folders")
unzipFiles(dirpath);