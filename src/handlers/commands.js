import {
	getDollarPrice,
	getGoldPrice,
	getCoinEmamiPrice,
	getUSDTPrice,
} from '../services/dollarService.js';

import { getNews } from '../services/newsService.js';
import { getWeather } from '../services/weatherService.js';
import { createCurrencyKeyboard,createNewsKeyboard, createKeyboard } from '../utilities/keyboard.js';
import { getTimeBasedGreeting } from '../utilities/time.js';
import {
	formatDollarPrice,
	formatCurrencyPrice,
	formatWeather,
	formatJavanIranianMessage,
	formatHelpMessage,
	formatNews
} from '../utilities/formatters.js';

// ← منوی ارزها
export async function handleCurrencyCommand(ctx) {
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.reply(`💰 ${name} جوان، کدوم ارز رو می‌خوای؟`, createCurrencyKeyboard());
}

// ← نمایش قیمت هر ارز
async function showCurrency(ctx, fetcher, name) {
	try {
		const data = await fetcher();
		await ctx.reply(formatCurrencyPrice(data, name));
	} catch (err) {
		await ctx.reply(`❌ خطا در دریافت ${name}`);
	}
}


export const handleDollarCommand = (ctx) => showCurrency(ctx, getDollarPrice, 'قیمت دلار (بازار آزاد)');
export const handleGoldCommand = (ctx) => showCurrency(ctx, getGoldPrice, 'قیمت طلای ۱۸ عیار');
export const handleCoinCommand = (ctx) => showCurrency(ctx, getCoinEmamiPrice, 'قیمت سکه امامی');
export const handleUSDTCommand = (ctx) => showCurrency(ctx, getUSDTPrice, 'قیمت تتر');


// استارت /start
export async function handleStartCommand(ctx) {
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.sendChatAction('typing');
	try {
		const greeting = getTimeBasedGreeting();
		const dollar = await getDollarPrice();
		const message = formatJavanIranianMessage(greeting, dollar);
		await ctx.reply(`🌱 سلام جوان ${name}، خوش اومدی!\n\n${message}`, createKeyboard());
	} catch (err) {
		console.error('❌ Start command error:', err);
		await ctx.reply(`🌱 سلام جوان ${name}، خوش اومدی!\n\nخطا در پردازش دستور`, createKeyboard());
	}
}

// اب و هوا
export async function handleWeatherCommand(ctx) {
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.sendChatAction('typing');
	try {
		const weather = await getWeather();
		await ctx.reply(`🌤 ${name} جوان، آب و هوای تبریز اینه:\n\n${formatWeather(weather)}`, createKeyboard());
	} catch (err) {
		console.error('❌ Weather command error:', err);
		await ctx.reply(`🌤 ${name} جوان، آب و هوای تبریز اینه:\n\nخطا در دریافت آب و هوا`, createKeyboard());
	}
}

export async function handleNewsCommand(ctx) {
    const name = ctx.from?.first_name || 'عزیز';
    await ctx.reply(
        `📰 ${name} جوان، کدوم بخش خبری رو می‌خوای ببینی؟`,
        createNewsKeyboard()
    );
}

export async function handleHelpCommand(ctx) {
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.reply(`سلام جوان ${name}\n\n${formatHelpMessage()}`, createKeyboard());
}