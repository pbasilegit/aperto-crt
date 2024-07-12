<template>
    <div v-if="faculty">
      <h1>{{ faculty.title.rendered }}</h1>
      <p>{{ faculty.faculty_member_bio }}</p>
      <p>{{ faculty.job_title }}</p>

      <p>{{ faculty.faculty_member_type[0].name }}</p>
      <p>{{ faculty.faculty_member_type[1].name}}</p>

      <img :src="faculty.faculty_member_foto.guid"/>

      <img src='https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_left-1.svg' />
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRoute } from 'vue-router';

  const axios = inject('axios');

  
  // Creiamo una variabile reattiva per memorizzare i dati del docente
  const faculty = ref(null);
  
  // Recuperiamo l'ID del docente dai parametri della rotta (ad esempio, se usi vue-router)
  const route = useRoute();
  const facultyId = route.params.id;
  
  // Funzione per recuperare i dati del docente dall'API
  const fetchFaculty = async (id) => {
    try {
      const response = await axios.get(`/wp/v2/faculty/${id}`);
      faculty.value = response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei dati del docente:', error);
    }
  };
  
  // Usiamo onMounted per chiamare fetchFaculty quando il componente viene montato
  onMounted(() => {
    fetchFaculty(facultyId);
  });
  </script>
  
  <style scoped>
  /* Aggiungi qui eventuali stili per il tuo componente */
  </style>
  