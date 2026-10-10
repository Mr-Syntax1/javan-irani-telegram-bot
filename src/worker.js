import { Telegraf, Markup } from 'telegraf';
import { getDollarPrice } from './services/dollarService.js';
import { getWeather } from './services/weatherService.js';

// کیبورد
const keyboard = Markup.inlineKeyboard([
    [
        Markup.button.callback('💵 قیمت دلار', 'dollar'),
        Markup.button.callback('🌤 آب و هوا', 'weather'),
    ],
    [
        Markup.button.callback('☀️ صبح بخیر', 'greet_morning'),
    ],
]);

// تابع ساخت ربات
const createBot = (token) => {
    const bot = new Telegraf(token);

    bot.command('start', (ctx) => {
        const name = ctx.from?.first_name || 'دوست عزیز';
        ctx.reply(
            `سلام ${name}! 👋\n\n` +
            `از دستورات زیر استفاده کن:\n` +
            `/dollar - قیمت دلار\n` +
            `/weather - آب و هوای تبریز\n` +
            `/javan_irani - سلام جوان ایرانی\n` +
            `/help - راهنما`,
            keyboard
        );
    });

    bot.command('dollar', async (ctx) => {
        try {
            await ctx.sendChatAction('typing');
            const dollar = await getDollarPrice();
            const changeEmoji = dollar.change >= 0 ? '🟢' : '🔴';
            const changeSign = dollar.change >= 0 ? '+' : '';

            await ctx.reply(
                `💵 قیمت دلار (بازار آزاد)\n\n` +
                `💰 قیمت: ${dollar.price.toLocaleString('fa-IR')} تومان\n` +
                `${changeEmoji} تغییر: ${changeSign}${dollar.change.toLocaleString('fa-IR')} (${dollar.changePct}%)\n` +
                `📈 بیشترین: ${dollar.high.toLocaleString('fa-IR')}\n` +
                `📉 کمترین: ${dollar.low.toLocaleString('fa-IR')}\n` +
                `🕐 ${dollar.updatedAt}`
            );
            
        } catch (err) {
            console.error('Dollar error:', err);
            await ctx.reply('❌ خطا در دریافت قیمت دلار');
        }
    });

    bot.command('weather', async (ctx) => {
        try {
            await ctx.sendChatAction('typing');
            const w = await getWeather();
            await ctx.reply(
                `🌤 آب و هوای ${w.city}\n\n` +
                `🌡 دما: ${w.temp}°C\n` +
                `🤔 احساس: ${w.feelsLike}°C\n` +
                `💧 رطوبت: ${w.humidity}%\n` +
                `💨 باد: ${w.windSpeed} km/h\n` +
                `📝 ${w.description}`
            );
        } catch (err) {
            console.error('Weather error:', err);
            await ctx.reply('❌ خطا در دریافت آب و هوا');
        }
    });

    // ← دستور جدید: /javan-irani
    bot.command('javan_irani', async (ctx) => {
        try {
            await ctx.sendChatAction('typing');

            // تشخیص صبح/ظهر/شب بر اساس ساعت تهران
            const hour = Number(
                new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    hour12: false,
                    timeZone: 'Asia/Tehran',
                }).format(new Date())
            );

            let greeting;
            if (hour >= 5 && hour < 12) greeting = 'صبح';
            else if (hour >= 12 && hour < 17) greeting = 'ظهر';
            else if (hour >= 17 && hour < 20) greeting = 'عصر';
            else greeting = 'شب';

            // گرفتن قیمت دلار
            const dollar = await getDollarPrice();
            const changeEmoji = dollar.change >= 0 ? '🟢' : '🔴';
            const changeSign = dollar.change >= 0 ? '+' : '';

            await ctx.reply(
                `${greeting} بخیر جوان بدبخت ایرانی 🌱\n\n` +
                `💵 قیمت دلار (بازار آزاد)\n\n` +
                `💰 قیمت: ${dollar.price.toLocaleString('fa-IR')} تومان\n` +
                `${changeEmoji} تغییر: ${changeSign}${dollar.change.toLocaleString('fa-IR')} (${dollar.changePct}%)\n` +
                `📈 بیشترین: ${dollar.high.toLocaleString('fa-IR')}\n` +
                `📉 کمترین: ${dollar.low.toLocaleString('fa-IR')}\n` +
                `🕐 ${dollar.updatedAt}`
            );
        } catch (err) {
            console.error('Javan_irani error:', err);
            await ctx.reply('❌ خطا در پردازش دستور');
        }
    });

    bot.command('help', (ctx) => {
        ctx.reply(
            `📚 راهنما\n\n` +
            `/start - شروع\n` +
            `/dollar - قیمت دلار\n` +
            `/weather - آب و هوا\n` +
            `/javan_irani - سلام جوان ایرانی\n` +
            `/help - راهنما`,
            keyboard
        );
    });

    bot.action('dollar', async (ctx) => {
        await ctx.answerCbQuery();
        try {
            const dollar = await getDollarPrice();
            await ctx.reply(`💰 ${dollar.price.toLocaleString('fa-IR')} تومان`);
        } catch (err) {
            await ctx.reply('❌ خطا');
        }
    });

    bot.action('weather', async (ctx) => {
        await ctx.answerCbQuery();
        try {
            const w = await getWeather();
            await ctx.reply(`🌡 ${w.temp}°C - ${w.description}`);
        } catch (err) {
            await ctx.reply('❌ خطا');
        }
    });

    bot.action('greet_morning', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.reply('صبح بخیر جوان بدبخت ایرانی 🌱');
    });

    return bot;
};

// Worker
export default {
    async fetch(request, env, ctx) {
        const bot = createBot(env.BOT_TOKEN);

        if (request.method === 'POST') {
            try {
                const update = await request.json();
                await bot.handleUpdate(update);
                return new Response('OK', { status: 200 });
            } catch (err) {
                console.error('Update error:', err);
                return new Response('Error', { status: 500 });
            }
        }

        return new Response('🤖 ربات فعاله!');
    },
};