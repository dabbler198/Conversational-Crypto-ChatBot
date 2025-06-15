import { getPrice } from '../services/api';

export async function updatePortfolio(current, coin, amount) {
  const updated = { ...current };
  updated[coin] = (updated[coin] || 0) + amount;
  return updated;
}

export async function getPortfolioSummary(portfolio) {
  if (Object.keys(portfolio).length === 0) return 'You have no holdings yet.';
  let total = 0;
  const lines = await Promise.all(Object.entries(portfolio).map(async ([coin, amount]) => {
    const price = await getPrice(coin);
    const value = price * amount;
    total += value;
    return `${amount} ${coin.toUpperCase()} ($${value.toFixed(2)})`;
  }));
  return `Your portfolio: ${lines.join(', ')}. Total value: $${total.toFixed(2)}`;
}
