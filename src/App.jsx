import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './components/ChatBubble';
import Chart from './components/Chart';
import { getTrendingCoins, getPrice, getChart, getCoinInfo } from './services/api';
import { extractCoinSymbol } from './utils/coinExtractor';
import { speak } from './utils/speech';
import { updatePortfolio, getPortfolioSummary } from './utils/portfolio';
import { Send, Mic } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [portfolio, setPortfolio] = useState({});
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender, time: getTime() }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    addMessage(userText, 'user');
    setInput('');
    setThinking(true);

    try {
      let responseText = "Sorry, I didn’t understand that.";

      if (/trending/i.test(userText)) {
        const coins = await getTrendingCoins();
        responseText = `Today’s trending coins are: ${coins.join(', ')}`;
      } else if (/what.*(\w+).*price|trading at/i.test(userText)) {
        const coin = extractCoinSymbol(userText);
        if (coin) {
          const price = await getPrice(coin);
          responseText = `${coin.toUpperCase()} is trading at $${price}`;
        }
      } else if (/I have (\d+(\.\d+)?) (\w+)/i.test(userText)) {
        const [, amount, , coin] = userText.match(/I have (\d+(\.\d+)?) (\w+)/i);
        const updated = await updatePortfolio(portfolio, coin.toLowerCase(), parseFloat(amount));
        setPortfolio(updated);
        const value = await getPrice(coin.toLowerCase());
        responseText = `Got it. Your ${amount} ${coin.toUpperCase()} is worth $${(value * amount).toFixed(2)}`;
      } else if (/portfolio/i.test(userText)) {
        const summary = await getPortfolioSummary(portfolio);
        responseText = summary;
      } else if (/chart.*(\w+)/i.test(userText)) {
        const coin = extractCoinSymbol(userText);
        const chartData = await getChart(coin.toLowerCase());
        addMessage(`Here’s the 7-day chart for ${coin.toUpperCase()}`, 'bot');
        setMessages((prev) => [...prev, { text: <Chart data={chartData} />, sender: 'bot', time: getTime() }]);
        setThinking(false);
        speak(`Here’s the 7-day chart for ${coin.toUpperCase()}`);
        return;
      } else if (/stats|info|market cap|description/i.test(userText)) {
            const coin = extractCoinSymbol(userText);
            const info = await getCoinInfo(coin);
            let marketCapFormatted;
            if (info.marketCap >= 1e9) {
              marketCapFormatted = `$${(info.marketCap / 1e9).toFixed(2)} billion`;
            } else if (info.marketCap >= 1e6) {
              marketCapFormatted = `$${(info.marketCap / 1e6).toFixed(2)} million`;
            } else {
                marketCapFormatted = `$${(info.marketCap / 1e3).toFixed(2)} thousand`;
            } 
            
            responseText = `${info.symbol} is currently trading at $${info.price.toFixed(2)} with a market cap of ${marketCapFormatted}. It has changed by ${info.change24h.toFixed(2)}% in the last 24 hours.`;
      }

      addMessage(responseText, 'bot');
      speak(responseText);
    } catch (err) {
      console.error(err);
      addMessage('Oops! Something went wrong or the API is rate-limited.', 'bot');
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-auto bg-white rounded-xl shadow p-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} {...msg} />
        ))}
        {thinking && <ChatBubble text="Thinking..." sender="bot" time={getTime()} />}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          className="flex-1 p-2 border rounded-xl"
          placeholder="Ask about crypto..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white rounded-full p-2">
          <Send size={18} />
        </button>
        <button className="p-2 border rounded-full">
          <Mic size={18} />
        </button>
      </div>
    </div>
  );
}
