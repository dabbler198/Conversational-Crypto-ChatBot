const knownCoins = {
    bitcoin: "BTC",
    btc: "BTC",
    ethereum: "ETH",
    eth: "ETH",
    solana: "SOL",
    sol: "SOL",
    dogecoin: "DOGE",
    doge: "DOGE",
    cardano: "ADA",
    ada: "ADA",
    ripple: "XRP",
    xrp: "XRP",
    binance: "BNB",
    bnb: "BNB"
    // add more coins as needed.
  };
  
  export function extractCoinSymbol(message) {
    const lower = message.toLowerCase();
    for (const key in knownCoins) {
      if (lower.includes(key)) return knownCoins[key];
    }
    return null;
  }
  