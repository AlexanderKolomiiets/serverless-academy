import { readFileSync } from 'fs';

const users = {};
const usernames = [];
for (let i = 0; i <= 19; i++) {
  const usernameFile = readFileSync(`./usernames/out${i}.txt`, 'utf8');
  const uniqueUsers = [...new Set(usernameFile.split('\n'))];
  uniqueUsers.forEach((user) => {
    if (users[user]) {
      users[user]++;
    } else {
      users[user] = 1;
    }
    usernames.push(user);
  });
}

const uniqueValues = () => {
  console.log([...new Set(usernames)].length);
};

const existInAllFiles = () => {
  let counter = 0;
  for (const key in users) {
    if (users[key] === 20) {
      counter++;
    }
  }
  console.log(counter);
};

const existInAtleastTen = () => {
  let counter = 0;
  for (const key in users) {
    if (users[key] >= 10) {
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
