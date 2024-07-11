<template>
    <div style="margin-top: 10vh;">
      <div v-for="partecipante in partecipanti" :key="partecipante.id" class="partecipante">
        <h3>{{ partecipante.title.rendered }}</h3>
        <span class="job-title">{{ partecipante.job_title }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';

  const axios = inject('axios');
  
  // Dichiariamo una variabile reattiva per memorizzare i dati dei partecipanti
  const partecipanti = ref([]);
  
  // Funzione per ottenere i dati dei partecipanti tramite Axios
  const fetchPartecipanti = async () => {
    try {
      const response = await axios.get('/wp/v2/alumni');
      partecipanti.value = response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei dati dei partecipanti', error);
    }
  };
  
  // Chiamata a fetchPartecipanti quando il componente viene montato
  onMounted(fetchPartecipanti);
  </script>
  
  <style scoped>
  .partecipante {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .job-title {
    font-weight: bold;
    color: #666;
  }
  </style>
  