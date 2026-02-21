import { initTelegram } from './telegram.js'
import { state } from './state.js'

console.log("=== FRONTEND STARTED ===");

initTelegram();
console.log('App state:', state);

const tg = window.Telegram?.WebApp;

if (!tg) {
    console.log("❌ Not inside Telegram");
} else {
    console.log("✅ Telegram WebApp detected");
    tg.ready();

    const API_URL = import.meta.env.VITE_API_URL;
    console.log("API URL:", API_URL);

    async function auth() {
        try {
            const initData = tg.initData;

            if (!initData) {
                console.log("⚠ No initData received");
                return;
            }

            console.log("InitData length:", initData.length);

            const response = await fetch(`${API_URL}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ initData })
            });

            const data = await response.json();
            console.log("✅ Auth success:", data);

        } catch (err) {
            console.error("❌ Auth error:", err);
        }
    }

    auth();
}