const compress = require('./compress');
const readline = require('readline');

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
            //extract.Zip(answer);
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