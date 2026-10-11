import {
	getDollarPrice,
	getGoldPrice,
	getCoinEmamiPrice,
	getUSDTPrice,
} from '../services/dollarService.js';

import { getWeather } from '../services/weatherService.js';
import { createCurrencyKeyboard, createKeyboard } from '../utilities/keyboard.js';
import { getTimeBasedGreeting } from '../utilities/time.js';
import {
	formatDollarPrice,
	formatCurrencyPrice,
	formatWeather,
	formatJavanIranianMessage,
	formatHelpMessage,
} from '../utilities/formatters.js';

// ← منوی ارزها
export async function handleCurrencyCommand(ctx) {
	await ctx.reply('💰 کدوم ارز رو می‌خوای؟', createCurrencyKeyboard());
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



export async function handleStartCommand(ctx) {
	await ctx.sendChatAction('typing');
	try {
		const greeting = getTimeBasedGreeting();
		const dollar = await getDollarPrice();
		await ctx.reply(formatJavanIranianMessage(greeting, dollar), createKeyboard());
	} catch (err) {
		console.error('❌ Start command error:', err);
		await ctx.reply('❌ خطا در پردازش دستور', createKeyboard());
	}
}

export async function handleWeatherCommand(ctx) {
	await ctx.sendChatAction('typing');
	try {
		const weather = await getWeather();
		await ctx.reply(formatWeather(weather), createKeyboard());
	} catch (err) {
		console.error('❌ Weather command error:', err);
		await ctx.reply('❌ خطا در دریافت آب و هوا', createKeyboard());
	}
}

export async function handleHelpCommand(ctx) {
	await ctx.reply(formatHelpMessage(), createKeyboard());
}