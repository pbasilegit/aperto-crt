import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
console.log('__dirname:', __dirname);
export default defineConfig({
  
  plugins: [vue()],
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
