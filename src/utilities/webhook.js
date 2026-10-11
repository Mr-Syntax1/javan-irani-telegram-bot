export function validateEnvironment(env) {
	if (!env.BOT_TOKEN) {
		throw new Error('BOT_TOKEN environment variable is required');
	}
	if (env.WEBHOOK_SECRET && typeof env.WEBHOOK_SECRET !== 'string') {
		throw new Error('WEBHOOK_SECRET must be a string');
	}
}

export function verifyWebhookSecret(request, secret) {
	if (!secret) return true;

	const providedSecret = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
	return providedSecret === secret;
}