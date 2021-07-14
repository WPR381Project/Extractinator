const decompress = require('decompress');
const fs = require('fs');
const path = require('path');
const { extname, basename, dirname } = require('path/posix');
const dirpath = './project_folders';


function extractZip(source, target)
{
  (async () => {
    //var sourceParameter = path.format(source);
      try {
          const files = await decompress(source, target);
             // filter: file => path.extname(file.path) !== ".exe";
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
        
        if (fs.statSync(dirPath + "/" + file).isDirectory()) 
        {
          files.forEach(file => {
            console.log(file);       
          });
          await unzipFiles(dirPath + "/" + file);

        } else 
        {
          const fullFilePath = dirname(file);
          const folderName = basename(file)+extname(file);
          if (extname(file)== ".zip") 
          {
            await extractZip(folderName, fullFilePath);
            await unzipFiles(path.join(fullFilePath,basename(file)));
          }
        }
      })
    );
  };

  unzipFiles(dirpath);