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
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.reply(`💰 ${name} جوان، کدوم ارز رو می‌خوای ببینی؟`, createCurrencyKeyboard());
}

// ← نمایش قیمت هر ارز
async function showCurrency(ctx, fetcher, name) {
	await ctx.answerCbQuery();
	const userName = ctx.from?.first_name || 'عزیز';
	try {
		const data = await fetcher();
		await ctx.reply(`💰 ${userName} جوان، اینم ${name}:\n\n${formatCurrencyPrice(data, name)}`, createKeyboard());
	} catch (err) {
		await ctx.reply(`❌ ${userName} جوان، خطا در دریافت ${name}`, createKeyboard());
	}
}

export const handleDollarAction = (ctx) => showCurrency(ctx, getDollarPrice, 'قیمت دلار (بازار آزاد)');
export const handleGoldAction = (ctx) => showCurrency(ctx, getGoldPrice, 'قیمت طلای ۱۸ عیار');
export const handleCoinAction = (ctx) => showCurrency(ctx, getCoinEmamiPrice, 'قیمت سکه امامی');
export const handleUSDTAction = (ctx) => showCurrency(ctx, getUSDTPrice, 'قیمت تتر');


export async function handleWeatherAction(ctx) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	try {
		const weather = await getWeather();
		await ctx.reply(`🌤 ${name} جوان، اینم آب و هوای تبریز:\n\n${formatWeather(weather)}`, createKeyboard());
	} catch (err) {
		console.error('❌ Weather action error:', err);
		await ctx.reply(`❌ ${name} جوان، خطا در دریافت آب و هوا`, createKeyboard());
	}
}

export async function handleStartAction(ctx) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	try {
		const greeting = getTimeBasedGreeting();
		const dollar = await getDollarPrice();
		const message = formatJavanIranianMessage(greeting, dollar);
		await ctx.reply(`🌱 سلام جوان ${name}!\nخوش اومدی به ربات اطلاعات ایرانی 🌱\n\n${message}`, createKeyboard());
	} catch (err) {
		console.error('❌ Start command error:', err);
		await ctx.reply(`🌱 سلام جوان ${name}!\nخوش اومدی به ربات اطلاعات ایرانی 🌱`, createKeyboard());
	}
}

export async function handleBackToMainAction(ctx) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.editMessageText(`🏠 ${name} جوان، برگشتیم به منوی اصلی:`, { reply_markup: createKeyboard().reply_markup });
}