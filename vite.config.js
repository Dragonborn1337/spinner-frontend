import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
    const isDev = command === 'serve'

    return {
        base: './',

        server: isDev
            ? {
                host: true,      // чтобы localhost работал стабильно
                port: 5173,
                strictPort: true
            }
            : undefined,

        build: {
            outDir: 'dist'
        }
    }
})