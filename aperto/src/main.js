import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Crea un'istanza Axios con la configurazione di base
const axiosInstance = axios.create({
  baseURL: 'https://www.aperto-crt.it/core/index.php/wp-json/',
  // Puoi aggiungere altre configurazioni qui
  // headers: { 'Authorization': 'Bearer token' }
});

const app = createApp(App);

// Configura Axios globalmente
app.provide('axios', axiosInstance);

app.use(router);

app.mount('#app');

