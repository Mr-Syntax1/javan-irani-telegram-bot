const DOLLAR_API = 'https://raw.githubusercontent.com/iran-market/iran-market.github.io/main/data/popular.json';

// تابع کلی برای گرفتن هر نماد
async function fetchSymbol(symbol, errorMessage) {
    try {
        const response = await fetch(DOLLAR_API);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const { data } = await response.json();
        const item = data.find(i => i.symbol === symbol);

        if (!item) {
            throw new Error(errorMessage);
        }

        return {
            price: item.price,
            change: item.change,
            changePct: item.change_pct,
            high: item.high,
            low: item.low,
            updatedAt: item.timestamp_jalali,
            name: item.name_fa,
        };
        
    } catch (err) {
        console.error(`❌ خطا در دریافت ${symbol}:`, err.message);
        throw err;
    }
}

// توابع اختصاصی
export const getDollarPrice = () => fetchSymbol('USD_IRR_FREE', 'قیمت دلار پیدا نشد');

export const getGoldPrice = () => fetchSymbol('GOLD_18K_IRR', 'قیمت طلای ۱۸ عیار پیدا نشد');

export const getCoinEmamiPrice = () => fetchSymbol('COIN_EMAMI_IRR', 'قیمت سکه امامی پیدا نشد');

export const getUSDTPrice = () => fetchSymbol('USDT_IRR', 'قیمت تتر پیدا نشد');