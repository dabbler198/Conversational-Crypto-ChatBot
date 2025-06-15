# Conversational Crypto ChatBot

A clean, mobile-friendly web chat app that answers cryptocurrency queries using the CryptoCompare API.

![screenshot](https://dummyimage.com/1200x600/ccc/000\&text=Crypto+Chat+Preview)

## 🚀 Features

* Real-time price queries (e.g., “What’s ETH trading at?”)
* Trending coins ("List today’s trending coins")
* Basic stats queries ("Provide brief description of ADA.")
* 7-day price chart rendering ("Render a 7-day price chart of BNB.")
* Track simple portfolio (e.g., “I have 2 ETH”) and live value
* Friendly UI with chat bubbles and timestamps
* Voice output (speech synthesis)
* Smooth scroll and "thinking..." loading state
* Error handling for API issues (rate limits, network, etc.)

## 🏗️ Tech Stack

* **React** + **Vite** + **Tailwind CSS**
* **CryptoCompare API** (free)
* **Recharts** for charts
* **Web Speech API** for assistant voice replies

## 📂 File Structure

```
conversational-crypto-chat/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ChatBubble.jsx
│   │   ├── Chart.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── portfolio.js
│   │   └── speech.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── README.md
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🛠️ Setup & Run

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/conversational-crypto-chat.git
cd conversational-crypto-chat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## 🌐 API

* Powered by [CryptoCompare API](https://min-api.cryptocompare.com/data)

## ✨ TODO 

* Voice input via microphone
* Authentication and persistent portfolio
* Deployment (Vercel/Netlify)

---

**License:** MIT

**Author:** Sagar Gupta ([@yourhandle](https://github.com/dabbler198))

---

💬 *“What’s ETH price today?” — Just ask!*
