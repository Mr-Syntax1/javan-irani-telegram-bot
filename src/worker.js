import { Telegraf } from 'telegraf';
import {
	handleStartCommand,
	handleCurrencyCommand,
	handleWeatherCommand,
	handleHelpCommand,
	handleNewsCommand
} from './handlers/commands.js';

import {
	handleCurrencyMenuAction,
	handleDollarAction,
	handleGoldAction,
	handleCoinAction,
	handleUSDTAction,
	handleWeatherAction,
	handleBackToMainAction,
	handleStartAction,
	handleNewsMenuAction,
	handleNewsEconomyAction,
	handleNewsPoliticsAction,
	handleNewsSportsAction,
	handleNewsTechAction,
	handleNewsInternationalAction,
	handleNewsAllAction,
} from './handlers/actions.js';

import { validateEnvironment, verifyWebhookSecret } from './utilities/webhook.js';

function createBot(token) {
	const bot = new Telegraf(token);

	// Commands
	bot.start(handleStartCommand);
	bot.command('currency', handleCurrencyCommand);
	bot.command('weather', handleWeatherCommand);
	bot.command('news', handleNewsCommand);
	bot.command('help', handleHelpCommand);

	// Actions (دکمه‌های شیشه‌ای)
	bot.action('news_menu', handleNewsMenuAction);
	bot.action('news_economy', handleNewsEconomyAction);
	bot.action('news_politics', handleNewsPoliticsAction);
	bot.action('news_sports', handleNewsSportsAction);
	bot.action('news_tech', handleNewsTechAction);
	bot.action('news_international', handleNewsInternationalAction);
	bot.action('news_all', handleNewsAllAction);

	bot.action('currency_menu', handleCurrencyMenuAction);
	bot.action('currency_dollar', handleDollarAction);
	bot.action('currency_gold', handleGoldAction);
	bot.action('currency_coin', handleCoinAction);
	bot.action('currency_usdt', handleUSDTAction);
	bot.action('weather', handleWeatherAction);
	bot.action('greet_morning', handleStartAction);
	bot.action('back_to_main', handleBackToMainAction);

	return bot;
}

export default {
	async fetch(request, env, ctx) { // کلاد فلر
		validateEnvironment(env);

		if (request.method === 'GET') {
			return new Response('🤖 ربات فعال است!', {
				status: 200,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			});
		}

		if (!verifyWebhookSecret(request, env.WEBHOOK_SECRET)) {
			console.warn('⚠️ Invalid webhook secret');
			return new Response('Unauthorized', { status: 401 });
		}

		const bot = createBot(env.BOT_TOKEN);

		// POST
		if (request.method === 'POST') {
			try {
				const update = await request.json();
				await bot.handleUpdate(update);
				return new Response('OK', { status: 200 });
			} catch (err) {
				console.error('❌ Update handling error:', err);
				return new Response('Internal Server Error', { status: 500 });
			}
		}

		return new Response('Method Not Allowed', { status: 405 });
	},
};