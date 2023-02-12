import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const chatId = 403311177;
const token = '6011878378:AAFVk5EcQt7iFeCxQJxOg9liOUNqaPFLIU0';
const privatBankApi = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11';
const bot = new TelegramBot(token, { polling: true });

const getExchangeRates = async (currency) => {
  const res = await axios.get(privatBankApi);
  const currencyRate = res.data.find((rate) => rate.ccy === currency);
  const {
    ccy,
    base_ccy,
    buy,
    sale,
  } = currencyRate;
  return `${ccy}/${base_ccy}\nbuy: ${(+buy).toFixed(2)};\nsale: ${(+sale).toFixed(2)};
  `;
};

bot.sendMessage(chatId, 'Privat exchange rates:', {
  reply_markup: {
    keyboard: [['Currency rates']],
    resize_keyboard: true,
  },
});

bot.onText(/Currency rates/, () => {
  bot.sendMessage(chatId, 'Select currency:', {
    reply_markup: {
      keyboard: [['USD'], ['EUR']],
      resize_keyboard: true,
    },
  });
});

bot.onText(/USD/, async (data) => {
  const rates = await getExchangeRates(data.text);
  bot.sendMessage(chatId, rates);
});

bot.onText(/EUR/, async (data) => {
  const rates = await getExchangeRates(data.text);
  bot.sendMessage(chatId, rates);
});
