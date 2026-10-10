// src/bot.js

import {TelegramBot} from 'node-telegram-bot-api';
import { getDollarPrice } from './services/dollarService.js';
import { getWeather } from './services/weatherService.js';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN توی .env ست نشده!');
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// =============================
// /start
// =============================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'دوست عزیز';

    const text = `
سلام ${name}! 👋
به ربات اطلاعات خوش اومدی.

از دستورات زیر استفاده کن:
/dollar - قیمت دلار
/weather - آب و هوای تبریز
/help - راهنما
    `.trim();

    bot.sendMessage(chatId, text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '💵 قیمت دلار', callback_data: 'dollar' },
                    { text: '🌤 آب و هوا', callback_data: 'weather' },
                ],
            ],
        },
    });
});

// =============================
// /dollar
// =============================
bot.onText(/\/dollar/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        await bot.sendChatAction(chatId, 'typing');

        const dollar = await getDollarPrice();

        const changeEmoji = dollar.change >= 0 ? '🟢' : '🔴';
        const changeSign = dollar.change >= 0 ? '+' : '';

        const text = `
💵 قیمت دلار (بازار آزاد)

💰 قیمت: ${dollar.price.toLocaleString('fa-IR')} تومان
${changeEmoji} تغییر: ${changeSign}${dollar.change.toLocaleString('fa-IR')} (${dollar.changePct}%)
📈 بیشترین: ${dollar.high.toLocaleString('fa-IR')}
📉 کمترین: ${dollar.low.toLocaleString('fa-IR')}
🕐 آخرین بروزرسانی: ${dollar.updatedAt}
        `.trim();

        bot.sendMessage(chatId, text);
    } catch (err) {
        bot.sendMessage(chatId, '❌ خطا در دریافت قیمت دلار. لطفاً بعداً تلاش کن.');
        console.error('Dollar error:', err.message);
    }
});

// =============================
// /weather
// =============================
bot.onText(/\/weather/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        await bot.sendChatAction(chatId, 'typing');

        const weather = await getWeather();

        const text = `
🌤 آب و هوای ${weather.city}

🌡 دما: ${weather.temp}°C
🤔 احساس: ${weather.feelsLike}°C
💧 رطوبت: ${weather.humidity}%
💨 باد: ${weather.windSpeed} km/h
📝 وضعیت: ${weather.description}
        `.trim();

        bot.sendMessage(chatId, text);
    } catch (err) {
        bot.sendMessage(chatId, '❌ خطا در دریافت آب و هوا. لطفاً بعداً تلاش کن.');
        console.error('Weather error:', err.message);
    }
});

// =============================
// /help
// =============================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    const text = `
📚 راهنمای ربات

دستورات موجود:
/start - شروع
/dollar - قیمت دلار
/weather - آب و هوای تبریز
/help - همین راهنما

💡 می‌تونی از دکمه‌های شیشه‌ای هم استفاده کنی.
    `.trim();

    bot.sendMessage(chatId, text);
});

// =============================
// دکمه‌های شیشه‌ای (Callback Query)
// =============================
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // جواب دادن به کلیک (تا دکمه از حالت لودینگ در بیاد)
    await bot.answerCallbackQuery(query.id);

    if (data === 'dollar') {
        // شبیه‌سازی دستور /dollar
        bot.emit('text', { ...query.message, text: '/dollar' });
    } else if (data === 'weather') {
        bot.emit('text', { ...query.message, text: '/weather' });
    }
});

// =============================
// خطاها
// =============================
bot.on('polling_error', (err) => {
    console.error('❌ Polling error:', err.message);
});

console.log('🤖 ربات روشن شد!');