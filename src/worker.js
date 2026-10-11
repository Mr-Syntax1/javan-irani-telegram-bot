import { Telegraf } from 'telegraf';
import {
	handleStartCommand,
	handleDollarCommand,
	handleWeatherCommand,
	handleHelpCommand,
} from './handlers/commands.js';

import {
	handleDollarAction,
	handleStartAction,
	handleWeatherAction,
} from './handlers/actions.js';

import { validateEnvironment, verifyWebhookSecret } from './utilities/webhook.js';

function createBot(token) {
	const bot = new Telegraf(token);

	// Commands
	bot.start(handleStartCommand);
	bot.command('dollar', handleDollarCommand);
	bot.command('weather', handleWeatherCommand);
	bot.command('help', handleHelpCommand);

	// Actions (دکمه‌های شیشه‌ای)
	bot.action('dollar', handleDollarAction);
	bot.action('weather', handleWeatherAction);
	bot.action('greet_morning', handleStartAction);

	return bot;
}

export default {
	async fetch(request, env, ctx) {
		validateEnvironment(env);

		if (!verifyWebhookSecret(request, env.WEBHOOK_SECRET)) {
			console.warn('⚠️ Invalid webhook secret');
			return new Response('Unauthorized', { status: 401 });
		}

		const bot = createBot(env.BOT_TOKEN);

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

		return new Response('🤖 ربات فعال است!', {
			status: 200,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	},
};