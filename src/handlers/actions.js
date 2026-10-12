import {
	getDollarPrice,
	getGoldPrice,
	getCoinEmamiPrice,
	getUSDTPrice,
} from '../services/dollarService.js';

import { getWeather } from '../services/weatherService.js';
import {
	createCurrencyKeyboard,
	createKeyboard,
	createNewsKeyboard
} from '../utilities/keyboard.js';

import { getTimeBasedGreeting } from '../utilities/time.js';
import {
	formatCurrencyPrice,
	formatJavanIranianMessage,
	formatWeather,
	formatNews
} from '../utilities/formatters.js';

import { getNews } from '../services/newsService.js';



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



async function showNews(ctx, sectionName) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	try {
		const articles = await getNews(sectionName);
		await ctx.reply(
			`📰 ${name}, بفرما جوان، اینم اخبار ${sectionName}:\n\n${formatNews(articles, sectionName)}`,
			createKeyboard()
		);
	} catch (err) {
		console.error('❌ News action error:', err);
		await ctx.reply(`❌ ${name} جوان، خطا در دریافت اخبار`, createKeyboard());
	}
}

export const handleNewsEconomyAction = (ctx) => showNews(ctx, 'اقتصاد');
export const handleNewsPoliticsAction = (ctx) => showNews(ctx, 'سیاسی');
export const handleNewsSportsAction = (ctx) => showNews(ctx, 'ورزش');
export const handleNewsTechAction = (ctx) => showNews(ctx, 'فناوری');
export const handleNewsInternationalAction = (ctx) => showNews(ctx, 'بین‌الملل');
export const handleNewsAllAction = (ctx) => showNews(ctx, null);

// منوی اخبار
export async function handleNewsMenuAction(ctx) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.reply(`📰 ${name} جوان، کدوم بخش خبری رو می‌خوای ببینی؟`, createNewsKeyboard());
}

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
		await ctx.reply(`🌱 سلام جوان ${name}\n\n${message}`, createKeyboard());
	} catch (err) {
		console.error('❌ Start command error:', err);
		await ctx.reply(`🌱 سلام جوان ${name}\n\n${message}`, createKeyboard());
	}
}

export async function handleBackToMainAction(ctx) {
	await ctx.answerCbQuery();
	const name = ctx.from?.first_name || 'عزیز';
	await ctx.editMessageText(`🏠 ${name} جوان، برگشتیم به منوی اصلی:`, { reply_markup: createKeyboard().reply_markup });
}