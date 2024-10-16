import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
  
  plugins: [vue()],
  base:'/',
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      
    },
  },
  css: {
    extract: true,
    emptyOutDir: true,
    outDir: 'src',
    filename: 'style.css', // Specifica un nome personalizzato per il file di output CSS
  }
});
