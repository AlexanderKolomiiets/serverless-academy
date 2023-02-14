import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const chatId = 403311177;
const token = '6011878378:AAFVk5EcQt7iFeCxQJxOg9liOUNqaPFLIU0';
const bot = new TelegramBot(token, { polling: true });

const privatBankApi = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '38d057bd87e726b8b5809fc8240e076a';
const city = 'Kyiv';

const weatherUrl = `${WEATHER_BASE_URL}?q=${city}&appid=${apiKey}`;

const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

const getWeatherForecast = async () => {
  const res = await axios.get(weatherUrl);
  return res.data.list.slice(0, 12);
};

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

bot.sendMessage(chatId, 'Welcome, choose an option', {
  reply_markup: {
    keyboard: [[`Forecast in ${city}`], ['Exchange rates']],
    resize_keyboard: true,
  },
});

bot.on('message', (msg) => {
  if (msg.text === `Forecast in ${city}`) {
    bot.sendMessage(msg.chat.id, 'Select time interval:', {
      reply_markup: {
        keyboard: [['at intervals of 3 hours'], ['at intervals of 6 hours'], ['Previous menu']],
        resize_keyboard: true,
      },
    });
  }
});

bot.on('message', async (msg) => {
  let interval;
  if (msg.text === 'at intervals of 3 hours') {
    interval = 3;
  }
  if (msg.text === 'at intervals of 6 hours') {
    interval = 6;
  }
  if (interval === 3 || interval === 6) {
    const forecast = await getWeatherForecast();
    let data = '';
    for (let i = 0; i < forecast.length; i += interval / 3) {
      const {
        main: {
          temp,
          temp_max,
          temp_min,
          humidity,
          pressure,
        },
        wind: { speed },
        dt_txt,
      } = forecast[i];
      data += `📆 Current date: ${dt_txt}\n`
      + `🌡️ Temperature: ${kelvinToCelsius(temp)}°C\n`
      + `📈 Max temp: ${kelvinToCelsius(temp_max)}°C\n`
      + `📉 Min temp: ${kelvinToCelsius(temp_min)}°C\n`
      + `💧 Umidity: ${humidity}%\n`
      + `📊 Pressure: ${pressure} hPa\n`
      + `💨 Wind: ${speed} Km/h\n\n`;
    }

    bot.sendMessage(msg.chat.id, data);
  }
});

bot.on('message', (msg) => {
  if (msg.text === 'Exchange rates') {
    bot.sendMessage(msg.chat.id, 'Select currency:', {
      reply_markup: {
        keyboard: [['USD'], ['EUR'], ['Previous menu']],
        resize_keyboard: true,
      },
    });
  }
});

bot.on('message', async (msg) => {
  if (msg.text === 'USD' || msg.text === 'EUR') {
    const rates = await getExchangeRates(msg.text);
    bot.sendMessage(msg.chat.id, rates);
  }
});

bot.onText(/Previous menu/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Please, choose an option', {
    reply_markup: {
      keyboard: [[`Forecast in ${city}`], ['Exchange rates']],
      resize_keyboard: true,
    },
  });
});
