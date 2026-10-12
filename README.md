# 🤖 Javan Irani Telegram Bot

<p align="center">
  <b>Persian Information Assistant — Fast, Free, Ad-Free</b>
</p>

<p align="center">
  <a href="https://t.me/poor_Iranys_Information_bot">
    <img src="https://img.shields.io/badge/Telegram-Live%20Demo-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Cloudflare%20Workers-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers">
  <img src="https://img.shields.io/badge/Telegraf-4.x-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegraf">
</p>

---

## 📖 About

**Javan Irani Telegram Bot** is a free, ad-free Telegram bot that provides real-time, practical information to Persian-speaking users.

Built with **Node.js** and **Telegraf**, deployed on **Cloudflare Workers** — no server, no cost, no ads.

---

## 🚀 Live Demo

Try the bot right now on Telegram:

<p align="center">
  <a href="https://t.me/poor_Iranys_Information_bot">
    <b>👉 🤖 Try the bot on Telegram 👈</b>
  </a>
</p>

Just click the link and hit `/start`. 🎉

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| **💵 Currency & Gold** | Live prices for USD, 18K Gold, Emami Coin, and USDT |
| **🌤 Weather** | Tabriz weather with temperature, humidity, wind, and condition |
| **📰 News** | Latest Iran International news across multiple categories |


<table>
<tr>
<td valign="top">

### 🎯 Commands

| Command | Description |
| :--- | :--- |
| `/start` | Start + show USD price |
| `/currency` | Currency menu (USD, Gold, Coin, USDT) |
| `/news` | News menu (Economy, Politics, Tech, ...) |
| `/weather` | Tabriz weather |
| `/help` | Help |

</td>
<td valign="middle" align="right">

<img width="320" height="180" alt="gif" src="https://github.com/user-attachments/assets/e3fcbfd0-0963-4476-a045-38d23355ff3f" />

</td>
</tr>
</table>


### 🖱️ Inline Keyboards

- **💵 Currency** → Choose a currency
- **📰 News** → Choose a news category
- **🌤 Weather** → Tabriz weather
- **🌅 Good Morning** → Greeting based on time

---

### 🚀 Available Scripts
| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `wrangler dev` | Run locally |
| `npm run deploy` | `wrangler deploy` | Deploy to Cloudflare |
| `npm run tail` | `wrangler tail` | View live logs |

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js 22** | Runtime |
| **Telegraf 4** | Telegram Bot Framework |
| **Cloudflare Workers** | Free hosting + bypass filtering |
| **Wrangler** | Deployment tool |
| **JavaScript (ESM)** | Programming language |

---

### 📦 Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| **telegraf** | ^4.16.3 | Telegram Bot Framework |
| **dotenv** | ^18.0.7 | Environment variables |
| **nodemon** | ^3.1.14 | Auto-restart during development |

---

### 📡 APIs Used

| API | Purpose |
| :--- | :--- |
| [iran-market](https://github.com/iran-market/iran-market.github.io) | Currency, Gold, Coin, USDT prices |
| [Open-Meteo](https://open-meteo.com) | Weather data |
| [FreeNewsApi](https://freenewsapi.ai) | News data |

---

## 📁 Project Structure

```text
javan-irani-telegram-bot/
├── src/
│   ├── worker.js                  # Entry point
│   ├── handlers/
│   │   ├── commands.js            # Commands (/start, /news, ...)
│   │   └── actions.js             # Inline keyboard actions
│   ├── services/
│   │   ├── dollarService.js        # Currency API
│   │   ├── weatherService.js       # Weather API
│   │   └── newsService.js          # News API
│   └── utilities/
│       ├── constants.js           # Constants
│       ├── keyboard.js             # Inline keyboards
│       ├── formatters.js           # Text formatters
│       ├── time.js                 # Tehran time detection
│       ├── webhook.js              # Webhook security
│       └── getWeatherCodes.js      # Weather code to text
├── .env.example                    # Environment variables sample
├── .gitignore
├── package.json
├── wrangler.toml                   # Cloudflare config
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

- Node.js 22+
- [Cloudflare](https://cloudflare.com) account
- Bot token from [@BotFather](https://t.me/BotFather)

### 1. Clone the repository

```bash
git clone https://github.com/Mr-Syntax1/javan-irani-telegram-bot.git
cd javan-irani-telegram-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set secrets

```bash
wrangler secret put BOT_TOKEN
wrangler secret put WEBHOOK_SECRET
```

### 4. Deploy

```bash
wrangler deploy
```

### 5. Set Webhook

```text
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<YOUR-WORKER>.workers.dev&secret_token=<WEBHOOK_SECRET>&drop_pending_updates=true
```

---

## 🔐 Security

- `WEBHOOK_SECRET` → Verifies requests come from Telegram.
- `BOT_TOKEN` → Stored in Cloudflare Secrets (not in code).
- Timeout → All API requests have timeouts.

---

## 🤝 Contributing

Want to contribute?

1. Fork the project.
2. Create a new Branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 💖 Support

If you find this project useful:

- ⭐ Star the repo
- 🐛 Report bugs
- 💡 Share ideas
- 📢 Tell your friends

<p align="center">
  <b>Made with ❤️</b>
</p>
