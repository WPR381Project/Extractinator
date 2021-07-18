const inquirer = require('inquirer');

module.exports = {
  askGithubCredentials: () => {
    const question = [
      {
        message: ('A simple application for creating and extracting archives for commands run just follow these instructions.')
      },
      {
        message: 'Would you like to extract folders or extract folders ?',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Would you like to extract folders or extract folders ?';
          }
        }
      }
    ];
    return inquirer.prompt(question);
  },
};