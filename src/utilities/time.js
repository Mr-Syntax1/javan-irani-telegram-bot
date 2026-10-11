import { GREETING_LABELS, GREETING_EMOJIS } from './constants.js';

export function getTehranHour() {
    return Number(
        new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: false,
            timeZone: 'Asia/Tehran',
        }).format(new Date())
    );
}

export function getTimeBasedGreeting() {
    const hour = getTehranHour();

    if (hour >= 5 && hour < 12) return {
        label: GREETING_LABELS.morning,
        emoji: GREETING_EMOJIS.morning
    };

    if (hour >= 12 && hour < 17) return {
        label: GREETING_LABELS.noon,
        emoji: GREETING_EMOJIS.noon
    };

    if (hour >= 17 && hour < 20) return {
        label: GREETING_LABELS.afternoon,
        emoji: GREETING_EMOJIS.afternoon
    };

    return {
        label: GREETING_LABELS.night,
        emoji: GREETING_EMOJIS.night
    };
}