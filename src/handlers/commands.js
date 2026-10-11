import { getDollarPrice } from '../services/dollarService.js';
import { getWeather } from '../services/weatherService.js';
import { createKeyboard } from '../utilities/keyboard.js';
import { getTimeBasedGreeting } from '../utilities/time.js';
import {
	formatDollarPrice,
	formatWeather,
	formatJavanIranianMessage,
	formatHelpMessage,
} from '../utilities/formatters.js';

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

export async function handleDollarCommand(ctx) {
	await ctx.sendChatAction('typing');
	try {
		const dollar = await getDollarPrice();
		await ctx.reply(formatDollarPrice(dollar), createKeyboard());
	} catch (err) {
		console.error('❌ Dollar command error:', err);
		await ctx.reply('❌ خطا در دریافت قیمت دلار', createKeyboard());
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