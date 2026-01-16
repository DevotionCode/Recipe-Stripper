const https = require('https');

const get = (url) => new Promise((resolve, reject) => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve({ meals: [] }); // default to empty on error
            }
        });
    }).on('error', reject);
});

async function test() {
    const urls = [
        'https://www.themealdb.com/api/json/v1/1/search.php?s=pasta',
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta',
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=pasta'
    ];

    for (const url of urls) {
        console.log(`Testing: ${url}`);
        const res = await get(url);
        const count = res.meals ? res.meals.length : 0;
        console.log(`Count: ${count}`);
        if (count > 0 && count < 5) {
            console.log("Samples:", res.meals.map(m => m.strMeal).join(', '));
        }
    }
}

test();
