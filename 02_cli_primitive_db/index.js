/* eslint-disable no-await-in-loop */
import inquirer from 'inquirer';
import { readFileSync, writeFileSync } from 'fs';

const questions = [
  {
    type: 'input',
    name: 'username',
    message: 'Enter the user name. To cancel press Enter: ',
    filter(value) {
      return value.trim();
    },
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Choose your gender: ',
    choices: ['male', 'female'],
    when(value) {
      return Boolean(value.username.trim());
    },
  },
  {
    type: 'number',
    name: 'age',
    message: 'Enter your age: ',
    when(value) {
      return Boolean(value.username.trim());
    },
    validate(value) {
      if (isNaN(value)) {
        return 'Write a valid number';
      }

      return true;
    },
  },
];

const searchQuestions = [
  {
    type: 'confirm',
    name: 'displayDB',
    message: 'Would you to search values in DB? ',
    default: false,
  },
  {
    type: 'input',
    name: 'searchedName',
    message: "Enter user's name you wanna find in DB: ",
    when(value) {
      return value.displayDB;
    },
  },
];

const launchDB = async () => {
  const prevDB = readFileSync('db.txt');
  let currentDB = prevDB.length ? JSON.parse(prevDB) : [];
  let isNotCancelled = true;

  while (isNotCancelled) {
    await inquirer.prompt(questions)
      .then((res) => {
        if (!res.username) {
          isNotCancelled = false;
          return;
        }
        currentDB = [...currentDB, res];
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  }

  writeFileSync('db.txt', JSON.stringify(currentDB, null, 2));

  await inquirer.prompt(searchQuestions)
    .then((res) => {
      if (res.searchedName) {
        const foundUser = currentDB.find(
          (user) => user.username.toLowerCase() === res.searchedName.toLowerCase(),
        );
        if (foundUser) {
          console.log(`User ${foundUser.username} was found`);
          console.log(foundUser);
        } else {
          console.log('User does not exist');
        }
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

launchDB();
