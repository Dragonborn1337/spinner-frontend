import './styles.css'
import './app.js'
import { state } from './state.js'

console.log("=== FRONTEND STARTED ===");

const tg = window.Telegram?.WebApp;

if (!tg) {
    console.warn("Running outside Telegram (dev mode)");
} else {
    console.log("✅ Telegram WebApp detected");

    tg.expand();
    tg.ready();

    const API_URL = import.meta.env.VITE_API_URL;
    console.log("API URL:", API_URL);

    async function auth() {
        try {
            const initData = tg.initData;

            if (!initData) {
                console.warn("No initData received");
                return;
            }

            const response = await fetch(`${API_URL}/api/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initData })
            });

            if (!response.ok) {
                throw new Error("Auth failed");
            }

            const data = await response.json();
            console.log("✅ Auth success:", data);
            localStorage.setItem('token', data.token);

            state.user = data.user;

            document.getElementById('stars').textContent = data.user.stars_balance;
            document.getElementById('ton').textContent = data.user.ton_balance;
            document.getElementById('userId').textContent = data.user.telegram_id;
            document.getElementById('username').textContent = data.user.username || '—';

        } catch (err) {
            console.error("Auth error:", err);
        }
    }

    auth();
}