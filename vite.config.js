import { defineConfig } from 'vite'

export default defineConfig({
    base: './', // ⚠️ важно для Telegram Mini App
    build: {
        outDir: 'dist'
    }
})