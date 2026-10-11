// ساخت دکمه‌های شیشه ای زیر پیام

import { Markup } from 'telegraf';
import { GREETING_EMOJIS } from './constants.js';

export function createKeyboard() {
	return Markup.inlineKeyboard([
		[
			Markup.button.callback('💵 قیمت دلار', 'dollar'),
			Markup.button.callback('🌤 آب و هوا', 'weather'),
		],
		[Markup.button.callback(`${GREETING_EMOJIS.morning} روز بخیر`, 'greet_morning')],
	]);
}