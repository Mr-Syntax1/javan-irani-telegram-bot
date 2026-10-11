import { getDollarPrice } from '../services/dollarService.js';
import { getWeather } from '../services/weatherService.js';
import { createKeyboard } from '../utilities/keyboard.js';
import { getTimeBasedGreeting } from '../utilities/time.js';
import { formatDollarPrice, formatJavanIranianMessage, formatWeather } from '../utilities/formatters.js';

export async function handleDollarAction(ctx) {
	await ctx.answerCbQuery();// بستن حالت لودینگ دکمه
	try {
		const dollar = await getDollarPrice();
		await ctx.reply(formatDollarPrice(dollar), createKeyboard());
	} catch (err) {
		console.error('❌ Dollar action error:', err);
		await ctx.reply('❌ خطا در دریافت قیمت دلار', createKeyboard());
	}
}

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
