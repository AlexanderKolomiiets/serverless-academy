/* eslint-disable camelcase */
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const apiKey = process.env.API_KEY;
const chatId = process.env.CHAT_ID;
const city = process.env.CITY;
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const URL = `${BASE_URL}?q=${city}&appid=${apiKey}`;

const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

const getWeatherForecast = async () => {
  const res = await axios.get(URL);
  return res.data.list.slice(0, 12);
};

bot.sendMessage(chatId, 'Weather forecast in Kyiv:', {
  reply_markup: {
    keyboard: [['Forecast in Kyiv']],
    resize_keyboard: true,
  },
});

bot.on('message', (msg) => {
  if (msg.text === 'Forecast in Kyiv') {
    bot.sendMessage(chatId, 'Select time interval:', {
      reply_markup: {
        keyboard: [['at intervals of 3 hours'], ['at intervals of 6 hours']],
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

    bot.sendMessage(chatId, data);
  }
});
