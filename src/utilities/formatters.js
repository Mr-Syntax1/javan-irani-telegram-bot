import { DOLLAR_EMOJIS } from './constants.js';

// قیمت دلار
export function formatCurrencyPrice(currency, name) {
	const changeEmoji = currency.change >= 0 ? DOLLAR_EMOJIS.up : DOLLAR_EMOJIS.down;
	const changeSign = currency.change >= 0 ? '+' : '';
	const trend = currency.change >= 0 ? 'صعودی' : 'نزولی';

	return (
		`💰 ${name}\n\n` +
		`💵 قیمت: ${currency.price.toLocaleString('fa-IR')} تومان\n` +
		`${changeEmoji} تغییر: ${changeSign}${currency.change.toLocaleString('fa-IR')} (${currency.changePct}%)\n` +
		`📊 روند: ${trend}\n\n` +
		`📈 بیشترین امروز: ${currency.high.toLocaleString('fa-IR')}\n` +
		`📉 کمترین امروز: ${currency.low.toLocaleString('fa-IR')}\n\n` +
		`🕐 آخرین بروزرسانی: ${currency.updatedAt}\n` +
		`📍 منبع: بازار آزاد تهران`
	);
}

// دلار
export function formatDollarPrice(dollar) {
	return formatCurrencyPrice(dollar, 'قیمت دلار (بازار آزاد)');
}

// وضعیت اب و هوا
export function formatWeather(weather) {
	return (
		`🌤 آب و هوای ${weather.city}\n\n` +
		`🌡 دما: ${weather.temp}°C\n` +
		`🤔 احساس: ${weather.feelsLike}°C\n` +
		`💧 رطوبت: ${weather.humidity}%\n` +
		`💨 باد: ${weather.windSpeed} km/h\n` +
		`📝 ${weather.description}`
	);
}

// پیام start و جوان ایرانی
export function formatJavanIranianMessage(greeting, dollar) {
	return (
		`${greeting.emoji} ${greeting.label} بخیر جوان بدبخت ایرانی 🌱\n\n` +
		formatDollarPrice(dollar)
	);
}

// اخبار /news
export function formatNews(articles, sectionName) {
	if (!articles || articles.length === 0) {
		return `📰 خبری با موضوع ${sectionName} پیدا نشد.`;
	}

	const newsText = articles.map((article, index) => {
		const date = new Date(article.publishedAt).toLocaleDateString('fa-IR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		const description = article.description
			? `\n📝 ${article.description.slice(0, 100)}...`
			: '';
		return (
			`${index + 1}. ${article.title}${description}\n` +
			`📌 ${article.source} | 🕐 ${date}\n` +
			`🔗 ${article.url}`
		);
	}).join('\n\n');

	return `📰 آخرین اخبار «${sectionName}» از صایب:\n\n${newsText}`;
}

// پیام /help
export function formatHelpMessage() {
	return (
		`📚 راهنما\n\n` +
		`/start - شروع\n` +
		`/currency - قیمت ارز ها\n` +
		`/news - اخبار ها\n` +
		`/weather - آب و هوا\n` +
		`/help - راهنما`
	);
}