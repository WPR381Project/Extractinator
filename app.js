const compress = require('./archive_handling/compress');
const extract = require('./archive_handling/extraction');
const readline = require('readline');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');

// Intro
console.log(
    chalk.yellow(
      figlet.textSync('Welcome to', { horizontalLayout: 'full' })
    )
  );
  console.log(
      chalk.blue(
        figlet.textSync('the amazing', { horizontalLayout: 'full' })
      )
    );
  console.log(
      chalk.red(
        figlet.textSync('EXTRACTI - NATOR', { horizontalLayout: 'full' })
      )
    );
  

// Initialize readline
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Ask for input
const AskInput = () => {
    return new Promise((resolve, reject) => {
        r1.question('1. Compress \n2. Extract \n3. Exit \n', (answer) => {
            resolve(answer);
        })
    })
}

// Ask for compress directory
const Compress = () => {
    return new Promise((resolve, reject) => {
        r1.question('Enter the file directory to compress: ', (answer) => {
            compress.Zip(answer);
            resolve();
        })
    })
}

// Ask for extract directory
const Extract = () => {
    return new Promise((resolve, reject) => {
        r1.question('Enter the file directory to extract: ', (answer) => {
            fs.access(answer, function(error) {
                if (error) { // If it doesnt exist
                    console.log('Directory does not exist!');
                } else { // If it exists
                    extract.Decompress(answer);
                }
            })
            resolve();
        })
    })
}

// Run the functions with async
(async () => {
    let option = await AskInput();

    while (option != 3) {
        if (option == 1) {
            await Compress();
        }
        else if (option == 2) {
            await Extract();
        } else {
            console.log('Please choose one of the given options! \n');
        }

        option = await AskInput();
    }
    r1.close();
})()