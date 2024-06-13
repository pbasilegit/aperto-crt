<template>
    <div>
      <div v-if="seminarDetails">
        <h2>{{ seminarDetails.title.rendered }}</h2>
        <div v-for="faculty in seminarDetails.seminario_faculty_member" :key="faculty.id">
          <h3>{{ faculty.post_title }}</h3>
          <p>{{ faculty.faculty_member_bio }}</p>
        </div>
      </div>
      <p v-else>Caricamento...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, inject } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'Seminario',
    setup() {
      const route = useRoute();
      const seminarDetails = ref(null);
      const axios = inject('axios');
  
      const fetchSeminarDetails = async () => {
        try {
          const response = await axios.get(`/wp/v2/seminario/${route.params.id}`);
          seminarDetails.value = response.data;
        } catch (error) {
          console.error('Errore nel recuperare i dettagli del seminario:', error);
        }
      };
  
      onMounted(() => {
        fetchSeminarDetails();
      });
  
      return {
        seminarDetails
      };
    }
  };
  </script>
  
  <style scoped>
  /* Aggiungi qui i tuoi stili */
  </style>
  