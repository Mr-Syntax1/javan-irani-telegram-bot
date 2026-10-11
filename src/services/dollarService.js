const DOLLAR_API = 'https://raw.githubusercontent.com/iran-market/iran-market.github.io/main/data/popular.json';

export const getDollarPrice = async () => {
    try {
        const response = await fetch(DOLLAR_API);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const { data } = await response.json();

        // پیدا کردن دلار
        const usd = data.find(item => item.symbol === 'USD_IRR_FREE');

        if (!usd) {
            throw new Error('قیمت دلار پیدا نشد');
        }
        
        return {
            price: usd.price,
            change: usd.change,
            changePct: usd.change_pct,
            high: usd.high,
            low: usd.low,
            updatedAt: usd.timestamp_jalali,
        };
    } catch (err) {
        console.error('❌ خطا در دریافت قیمت دلار:', err.message);
        throw err;
    }
};
