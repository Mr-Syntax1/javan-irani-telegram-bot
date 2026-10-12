// ساخت دکمه‌های شیشه ای زیر پیام

import { Markup } from 'telegraf';
import { CURRENCIES, GREETING_EMOJIS } from './constants.js';

// دکمه های شفاف
export function createKeyboard() {
	return Markup.inlineKeyboard([
		[
			Markup.button.callback('💵 ارز', 'currency_menu'),
			Markup.button.callback('📰 اخبار', 'news_menu'),
		],

		[
		Markup.button.callback('🌤 آب و هوا', 'weather'),
		Markup.button.callback(`${GREETING_EMOJIS.morning} روز بخیر`, 'greet_morning'),
		],
	]);
}

export function createNewsKeyboard() {
	return Markup.inlineKeyboard([
		[
			Markup.button.callback('💰 اقتصاد', 'news_economy'),
			Markup.button.callback('🏛 سیاسی', 'news_politics'),
		],
		[
			Markup.button.callback('⚽ ورزشی', 'news_sports'),
			Markup.button.callback('💻 فناوری', 'news_tech'),
		],
		[
			Markup.button.callback('🌍 بین‌الملل', 'news_international'),
			Markup.button.callback('📰 همه اخبار', 'news_all'),
		],
		[
			Markup.button.callback('🔙 بازگشت', 'back_to_main'),
		],
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