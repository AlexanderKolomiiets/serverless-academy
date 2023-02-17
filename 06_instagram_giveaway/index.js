import { readFileSync, readdirSync } from 'fs';

const folder = './usernames/';
const userOccursCount = {};

const files = readdirSync(folder).map((file) => file);

files.forEach((file) => {
  const usernamesFile = readFileSync(`${folder + file}`, 'utf8');
  const uniqueUsers = [...new Set(usernamesFile.split('\n'))];
  uniqueUsers.forEach((user) => {
    if (userOccursCount[user]) {
      userOccursCount[user]++;
    } else {
      userOccursCount[user] = 1;
    }
  });
});

const uniqueValues = () => {
  console.log(Object.keys(userOccursCount).length);
};

const existInAllFiles = () => {
  let counter = 0;
  for (const key in userOccursCount) {
    if (userOccursCount[key] === 20) {
      counter++;
    }
  }
  console.log(counter);
};

const existInAtleastTen = () => {
  let counter = 0;
  for (const key in userOccursCount) {
    if (userOccursCount[key] >= 10) {
      counter++;
    }
  }
  console.log(counter);
};

const checkPerformanceTime = () => {
  console.time('getUniqueValues');
  uniqueValues();
  console.timeEnd('getUniqueValues');

  console.time('checkAllFiles');
  existInAllFiles();
  console.timeEnd('checkAllFiles');

  console.time('checkAtLeastTen');
  existInAtleastTen();
  console.timeEnd('checkAtLeastTen');
};

checkPerformanceTime();
