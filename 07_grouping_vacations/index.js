import { readFileSync, writeFileSync } from 'fs';

const vacations = readFileSync('./vacations.json');
const users = {};

const groupVacations = (json) => {
  const arr = JSON.parse(json);
  arr.forEach((value) => {
    const userId = value.user._id;
    const { name } = value.user;
    const { endDate, startDate } = value;

    if (userId in users) {
      users[userId].vacations.push({ startDate, endDate });
    } else {
      users[userId] = { userId, name, vacations: [{ startDate, endDate }] };
    }
  });

  return Object.values(users);
};

writeFileSync('formattedVacations.json', JSON.stringify(groupVacations(vacations), null, 4));
