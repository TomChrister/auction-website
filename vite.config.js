import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve (__dirname, 'index.html'),
                login: resolve (__dirname, 'account/login.html'),
                profile: resolve (__dirname, 'fetch-requests/index.html'),
            },
        },
    },
});