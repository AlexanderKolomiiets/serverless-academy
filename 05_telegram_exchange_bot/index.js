import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const chatId = 403311177;
const token = '6011878378:AAFVk5EcQt7iFeCxQJxOg9liOUNqaPFLIU0';
const bot = new TelegramBot(token, { polling: true });
