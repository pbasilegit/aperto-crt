<template>
      <main class="head-space-top">
      <section>  
      <ul class="accordion-content">
        <li class="accordion-content--persona" v-for="partecipante in partecipanti" :key="partecipante.id">
          <p class="nome">{{ partecipante.title.rendered }}</p>
          <p class="job-title">{{ partecipante.job_title }}</p>
        </li>
      </ul>
    </section>
    </main>
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
  
