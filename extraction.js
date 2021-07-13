const extract = require('extract-zip');
const fs = require('fs');
var path = require('path');
const dirpath = './project_folders';



async function extractZip(source, target) 
{
    try 
    {
      await extract(source, { dir: target });
      console.log("Extraction complete");
    } catch (err) 
    {
      console.log("Oops: extractZip failed", err);
    }
  }

  const unzipFiles = async function (dirPath) 
  {
    const files = fs.readdirSync(dirPath);
  
    await Promise.all(
      files.map(async (file) => 
      {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) 
        {
          await unzipFiles(dirPath + "/" + file);
        } else 
        {
          const fullFilePath = path.join(dirPath, "/", file);
          const folderName = file.replace(".zip", "");
          if (file.endsWith(".zip")) 
          {
            zippedFiles.push(folderName);
            await extractZip(fullFilePath, path.join(dirPath, "/", folderName));
            await unzipFiles(path.join(dirPath, "/", folderName));
          }
        }
      })
    );
  };

  unzipFiles(dirpath);