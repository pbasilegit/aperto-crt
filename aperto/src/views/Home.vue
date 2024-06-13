<template>
  <div>
    <h1>Elenco dei Seminari</h1>
   
      <div v-for="seminario in seminari" :key="seminario.id">
        <router-link :to="{ name: 'Seminario', params: { id: seminario.id } }">
          {{ seminario.title.rendered }}
        </router-link>
      </div>

  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';

export default {
  name: 'Home',
  setup() {
    const seminari = ref([]);
    const axios = inject('axios');

    const fetchSeminari = async () => {
      try {
        const response = await axios.get('/wp/v2/seminario');
        seminari.value = response.data;
      } catch (error) {
        console.error('Errore nel recuperare i seminari:', error);
      }
    };

    onMounted(() => {
      fetchSeminari();
    });

    return {
      seminari
    };
  }
};
</script>

<style scoped>
/* Aggiungi qui i tuoi stili */
</style>
