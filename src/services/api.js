const BASE = 'https://min-api.cryptocompare.com/data';
const API_KEY = import.meta.env.VITE_CC_API_KEY;

async function fetchCC(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}&api_key=${API_KEY}`);
  const data = await res.json();
  if (data.Response === 'Error') throw new Error(data.Message);
  return data;
}

export async function getCoinInfo(coin) {
    const data = await fetchCC(`pricemultifull?fsyms=${coin.toUpperCase()}&tsyms=USD`);
    const info = data?.RAW?.[coin.toUpperCase()]?.USD;
  
    if (!info) throw new Error(`No data found for ${coin}`);
  
    return {
      symbol: info.FROMSYMBOL,
      marketCap: info.MKTCAP,
      change24h: info.CHANGEPCT24HOUR,
      price: info.PRICE,
      description: `Live data for ${coin.toUpperCase()} from CryptoCompare.`
    };
}

export async function getPrice(coin) {
  const data = await fetchCC(`price?fsym=${coin.toUpperCase()}&tsyms=USD`);
  return data.USD;
}

export async function getTrendingCoins() {
  const data = await fetchCC(`top/totalvolfull?limit=7&tsym=USD`);
  return data.Data.map(d => d.CoinInfo.Name);
}

export async function getChart(coin) {
    try {
      const data = await fetchCC(`v2/histoday?fsym=${coin.toUpperCase()}&tsym=USD&limit=6`);
  
      if (
        !data ||
        data.Response !== 'Success' ||
        !data.Data ||
        !Array.isArray(data.Data.Data)
      ) {
        throw new Error('Invalid chart data structure from API');
      }
  
      return data.Data.Data.map(item => ({
        date: new Date(item.time * 1000).toLocaleDateString(),
        price: item.close
      }));
    } catch (err) {
      console.error('Chart fetch failed:', err.message);
      return null; 
    }
  }