// // src/bot.js
// wrangler deploy

// import 'dotenv/config';
// import { Telegraf, Markup } from 'telegraf';
// import { getDollarPrice } from './services/dollarService.js';
// import { getWeather } from './services/weatherService.js';

// const BOT_TOKEN = process.env.BOT_TOKEN;

// if (!BOT_TOKEN) {
//     throw new Error('BOT_TOKEN توی .env ست نشده!');
// }


// const bot = new Telegraf(BOT_TOKEN);

// // =============================
// // کیبورد
// // =============================
// const mainKeyboard = Markup.inlineKeyboard([
//     [
//         Markup.button.callback('💵 قیمت دلار', 'dollar'),
//         Markup.button.callback('🌤 آب و هوا', 'weather'),
//     ],
// ]);

// // =============================
// // /start
// // =============================
// bot.start((ctx) => {
//     const name = ctx.from?.first_name || 'دوست عزیز';

//     const text = `
// سلام ${name}! 👋
// به ربات اطلاعات خوش اومدی.

// از دستورات زیر استفاده کن:
// /dollar - قیمت دلار
// /weather - آب و هوای تبریز
// /help - راهنما
//     `.trim();

//     ctx.reply(text, mainKeyboard);
// });

// // =============================
// // /dollar
// // =============================
// bot.command('dollar', async (ctx) => {
//     try {
//         await ctx.sendChatAction('typing');

//         const dollar = await getDollarPrice();

//         const changeEmoji = dollar.change >= 0 ? '🟢' : '🔴';
//         const changeSign = dollar.change >= 0 ? '+' : '';

//         const text = `
// 💵 قیمت دلار (بازار آزاد)

// 💰 قیمت: ${dollar.price.toLocaleString('fa-IR')} تومان
// ${changeEmoji} تغییر: ${changeSign}${dollar.change.toLocaleString('fa-IR')} (${dollar.changePct}%)
// 📈 بیشترین: ${dollar.high.toLocaleString('fa-IR')}
// 📉 کمترین: ${dollar.low.toLocaleString('fa-IR')}
// 🕐 آخرین بروزرسانی: ${dollar.updatedAt}
//         `.trim();

//         await ctx.reply(text);
//     } catch (err) {
//         console.error('Dollar error:', err.message);
//         await ctx.reply('❌ خطا در دریافت قیمت دلار. لطفاً بعداً تلاش کن.');
//     }
// });

// // =============================
// // /weather
// // =============================
// bot.command('weather', async (ctx) => {
//     try {
//         await ctx.sendChatAction('typing');

//         const weather = await getWeather();

//         const text = `
// 🌤 آب و هوای ${weather.city}

// 🌡 دما: ${weather.temp}°C
// 🤔 احساس: ${weather.feelsLike}°C
// 💧 رطوبت: ${weather.humidity}%
// 💨 باد: ${weather.windSpeed} km/h
// 📝 وضعیت: ${weather.description}
//         `.trim();

//         await ctx.reply(text);
//     } catch (err) {
//         console.error('Weather error:', err.message);
//         await ctx.reply('❌ خطا در دریافت آب و هوا. لطفاً بعداً تلاش کن.');
//     }
// });

// // =============================
// // /help
// // =============================
// bot.command('help', (ctx) => {
//     const text = `
// 📚 راهنمای ربات

// دستورات موجود:
// /start - شروع
// /dollar - قیمت دلار
// /weather - آب و هوای تبریز
// /help - همین راهنما

// 💡 می‌تونی از دکمه‌های شیشه‌ای هم استفاده کنی.
//     `.trim();

//     ctx.reply(text, mainKeyboard);
// });

// // =============================
// // دکمه‌های شیشه‌ای (Callback Query)
// // =============================
// bot.action('dollar', async (ctx) => {
//     await ctx.answerCbQuery();
//     // صدا زدن هندلر /dollar
//     await bot.handleUpdate({
//         update_id: 0,
//         message: {
//             message_id: ctx.callbackQuery.message.message_id,
//             chat: ctx.callbackQuery.message.chat,
//             from: ctx.callbackQuery.from,
//             date: Math.floor(Date.now() / 1000),
//             text: '/dollar',
//         },
//     });
// });

// bot.action('weather', async (ctx) => {
//     await ctx.answerCbQuery();
//     await bot.handleUpdate({
//         update_id: 0,
//         message: {
//             message_id: ctx.callbackQuery.message.message_id,
//             chat: ctx.callbackQuery.message.chat,
//             from: ctx.callbackQuery.from,
//             date: Math.floor(Date.now() / 1000),
//             text: '/weather',
//         },
//     });
// });

// // =============================
// // پیام‌های ناشناخته
// // =============================
// bot.on('text', (ctx) => {
//     const text = ctx.message.text;

//     if (text.startsWith('/')) {
//         ctx.reply('❓ دستور ناشناخته است. /help رو بزن.', mainKeyboard);
//     }
// });

// // =============================
// // خطاها
// // =============================
// bot.catch((err, ctx) => {
//     console.error('❌ Bot error:', err);
//     ctx.reply('❌ یه خطای غیرمنتظره پیش اومد.').catch(() => {});
// });

// // =============================
// // راه‌اندازی
// // =============================
// bot.launch()
//     .then(() => {
//         console.log('🤖 ربات روشن شد!');
//     })
//     .catch((err) => {
//         console.error('❌ خطا در راه‌اندازی ربات:', err.message);
//         process.exit(1);
//     });

// // خاموش کردن تمیز
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));