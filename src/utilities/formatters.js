import { DOLLAR_EMOJIS } from './constants.js';

export function formatDollarPrice(dollar) {
	const changeEmoji = dollar.change >= 0 ? DOLLAR_EMOJIS.up : DOLLAR_EMOJIS.down;
	const changeSign = dollar.change >= 0 ? '+' : '';
	const trend = dollar.change >= 0 ? 'صعودی' : 'نزولی';

	return (
		`💵 قیمت دلار (بازار آزاد)\n\n` +
		`💰 قیمت: ${dollar.price.toLocaleString('fa-IR')} تومان\n` +
		`${changeEmoji} تغییر: ${changeSign}${dollar.change.toLocaleString('fa-IR')} (${dollar.changePct}%)\n` +
		`📊 روند: ${trend}\n\n` +
		`📈 بیشترین امروز: ${dollar.high.toLocaleString('fa-IR')}\n` +
		`📉 کمترین امروز: ${dollar.low.toLocaleString('fa-IR')}\n\n` +
		`🕐 آخرین بروزرسانی: ${dollar.updatedAt}\n` +
		`📍 منبع: بازار آزاد تهران`
	);
}

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

export function formatJavanIranianMessage(greeting, dollar) {
	return (
		`${greeting.emoji} ${greeting.label} بخیر جوان بدبخت ایرانی 🌱\n\n` +
		formatDollarPrice(dollar)
	);
}

export function formatHelpMessage() {
	return (
		`📚 راهنما\n\n` +
		`/start - شروع\n` +
		`/dollar - قیمت دلار\n` +
		`/weather - آب و هوا\n` +
		`/help - راهنما`
	);
}