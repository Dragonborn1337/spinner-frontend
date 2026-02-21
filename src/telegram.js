export function initTelegram() {
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
        tg.expand()
        tg.ready()
        return tg
    }
    return null
}