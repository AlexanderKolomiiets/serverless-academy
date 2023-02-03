const readline = require("readline");

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = () => {
  terminal.question(
    "Hello. Enter 10 words or digits dividing them in spaces: ",
    (answer) => {
      if (answer === "exit") {
        terminal.close();
        return;
      }
      terminal.question(
        "a. Sort words alphabetically\n" +
        "b. Show numbers from lesser to greater\n" +
        "c. Show numbers from bigger to smaller\n" +
        "d. Display words in ascending order by number of letters in the word\n" +
        "e. Show only unique words\n" +
        "f. Display only unique values from the set of words and numbers.\n\n" +
        "Enter a letter to choose an operation: ",
        (choice) => {
          const arr = answer.split(" ");
  
          switch (choice) {
            case "a":
              console.log(sortWordsByAlph(arr));
              break;
            case "b":
              console.log(sortAscending(arr));
              break;
            case "c":
              console.log(sortDescending(arr));
              break;
            case "d":
              console.log(sortWordsByLength(arr));
              break;
            case "e":
              const filteredArr = arr.filter((el) => isNaN(el));
              console.log(getUniqueValues(filteredArr));
              break;
            case "f":
              console.log(getUniqueValues(arr));
              break;
            case "exit":
              break;
            default:
              console.log("Invalid option. Try again");
              question();
              return;
          }
          terminal.close();
        }
      );
    }
  );
}

question();

function sortWordsByAlph(array) {
  return array
    .filter((el) => isNaN(el))
    .sort((a, b) => a.localeCompare(b))
    .join(" ");
}
function sortAscending(array) {
  return array
    .filter((el) => !isNaN(el))
    .sort((a, b) => a - b)
    .join(" ");
}
function sortDescending(array) {
  return array
    .filter((el) => !isNaN(el))
    .sort((a, b) => b - a)
    .join(" ");
}
function sortWordsByLength(array) {
  return array
    .filter((el) => isNaN(el))
    .sort((a, b) => a.length - b.length)
    .join(" ");
}
function getUniqueValues(array) {
  return Array.from(new Set(array)).join(" ");
}
