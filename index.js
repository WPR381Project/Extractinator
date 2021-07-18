const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./helper/files');

// index.js

clear();

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

//index.js

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
    process.exit();
  }

  const inquirer  = require('./helper/inquirer');

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  console.log(credentials);
};

run();