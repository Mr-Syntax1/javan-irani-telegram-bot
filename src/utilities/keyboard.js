// ساخت دکمه‌های شیشه ای زیر پیام

import { Markup } from 'telegraf';
import { CURRENCIES, GREETING_EMOJIS } from './constants.js';

export function createKeyboard() {
	return Markup.inlineKeyboard([
		[
			Markup.button.callback('💵 ارز', 'currency_menu'), 
			Markup.button.callback('🌤 آب و هوا', 'weather'),
		],
		[Markup.button.callback(`${GREETING_EMOJIS.morning} روز بخیر`, 'greet_morning')],
	]);
}

// کیبورد انتخاب ارز
export function createCurrencyKeyboard() {
	// هر ردیف 2 تا دکمه
	const rows = [];
	for (let i = 0; i < CURRENCIES.length; i += 2) {
		const row = CURRENCIES.slice(i, i + 2).map(c =>
			Markup.button.callback(`${c.emoji} ${c.name}`, `currency_${c.key}`)
		);
		rows.push(row);
	}
	rows.push([Markup.button.callback('🔙 بازگشت', 'back_to_main')]);
	return Markup.inlineKeyboard(rows);
}