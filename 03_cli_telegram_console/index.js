import { program } from 'commander';
import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(token);

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
