import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
    plugins: [
        react()],
    resolve: {
        alias: {
            '@icons': path.resolve(__dirname, 'src/shared/ui/icons'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@': path.resolve(__dirname, 'src'),
            '@/features': path.resolve(__dirname, './src/features'),
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        preprocessorOptions: {
            scss: {},
        },
    },
})
