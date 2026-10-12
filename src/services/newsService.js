const NEWS_API_URL = 'https://freenewsapi.ai/v1/search';

export const getNews = async (section = null, size = 5) => {
    try {
        const url = new URL(NEWS_API_URL);
        url.searchParams.set('host', 'sayeb.ir');
        url.searchParams.set('lang', 'fa');
        url.searchParams.set('size', size);
        url.searchParams.set('sort', 'date');

        if (section) {
            url.searchParams.set('q', section);
        }

        const response = await fetch(url, {
            signal: AbortSignal.timeout(10000), // اگه API 10 ثانیه جواب نده، لغو کن
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return [];
        }

        return data.results.map(article => ({
            title: article.title,
            url: article.url,
            source: article.sitename || 'صایب',
            publishedAt: article.published_at,
            description: article.description || '',
        }));
    } catch (err) {
        console.error('❌ خطا در دریافت اخبار:', err.message);
        throw err;
    }
};