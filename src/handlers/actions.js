import {
	getDollarPrice,
	getGoldPrice,
	getCoinEmamiPrice,
	getUSDTPrice,
} from '../services/dollarService.js';
import { getWeather } from '../services/weatherService.js';
import { createKeyboard, createCurrencyKeyboard } from '../utilities/keyboard.js';
import { getTimeBasedGreeting } from '../utilities/time.js';
import {
    formatCurrencyPrice,
    formatJavanIranianMessage,
    formatWeather,
} from '../utilities/formatters.js';

// ← منوی ارزها
export async function handleCurrencyMenuAction(ctx) {
	await ctx.answerCbQuery();
	await ctx.reply('💰 کدوم ارز رو می‌خوای؟', createCurrencyKeyboard());
}

// ← نمایش قیمت هر ارز
async function showCurrency(ctx, fetcher, name) {
	await ctx.answerCbQuery();
	try {
		const data = await fetcher();
		await ctx.reply(formatCurrencyPrice(data, name), createKeyboard());
	} catch (err) {
		await ctx.reply(`❌ خطا در دریافت ${name}`, createKeyboard());
	}
}

export const handleDollarAction = (ctx) => showCurrency(ctx, getDollarPrice, 'قیمت دلار (بازار آزاد)');
export const handleGoldAction = (ctx) => showCurrency(ctx, getGoldPrice, 'قیمت طلای ۱۸ عیار');
export const handleCoinAction = (ctx) => showCurrency(ctx, getCoinEmamiPrice, 'قیمت سکه امامی');
export const handleUSDTAction = (ctx) => showCurrency(ctx, getUSDTPrice, 'قیمت تتر');


export async function handleWeatherAction(ctx) {
	await ctx.answerCbQuery();
	try {
		const weather = await getWeather();
		await ctx.reply(formatWeather(weather), createKeyboard());
	} catch (err) {
		console.error('❌ Weather action error:', err);
		await ctx.reply('❌ خطا در دریافت آب و هوا', createKeyboard());
	}
}

export async function handleStartAction(ctx) {
	await ctx.answerCbQuery();
	try {
		const greeting = getTimeBasedGreeting();
		const dollar = await getDollarPrice();
		await ctx.reply(formatJavanIranianMessage(greeting, dollar), createKeyboard());
	} catch (err) {
		console.error('❌ Start command error:', err);
		await ctx.reply('❌ خطا در پردازش دستور', createKeyboard());
	}
}

export async function handleBackToMainAction(ctx) {
	await ctx.answerCbQuery();
	await ctx.editMessageText('🏠 منوی اصلی:', createKeyboard());
}