import { program } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const token = '6011878378:AAFVk5EcQt7iFeCxQJxOg9liOUNqaPFLIU0';
const chatId = 403311177;

const bot = new TelegramBot(token, { polling: true });

program
  .command('message <message>')
  .alias('m')
  .description('Send a message to the @serverless_console_bot')
  .action((message) => {
    bot.sendMessage(chatId, message);
  });

program
  .command('photo <path>')
  .alias('p')
  .description('Just drag and drop a photo into the console to the @serverless_console_bot')
  .action((photoPath) => {
    bot.sendPhoto(chatId, photoPath);
    console.log('You have successfully sent your photo');
  });

program.parse(process.argv);
