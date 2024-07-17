<template>
  <main v-if="faculty" class="head-space-top">

    <header class="pagina-docente--testata">
      <button class="pagina-docente--back" @click="goback"><img
          src='https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_left-1.svg' /></button>

      <h1 class="pagina-docente--nome-docente">{{ faculty.title.rendered }}</h1>

      <h2 class="pagina-docente--job-title">{{ faculty.job_title }}</h2>

      <h2 class="pagina-docente--tipologia"> {{ faculty.faculty_member_type[0].name }}</h2>
    </header>
    <section>
      <figure class="ritratto-docente">
        <img :src="faculty.faculty_member_foto.guid" :alt="faculty.title.rendered" />
      </figure>
    </section>
    <section>
      <p class="pagina-docente--bio">{{ faculty.faculty_member_bio }}</p>
    </section>



  </main>
  <div v-else>
    <p>Caricamento in corso...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const axios = inject('axios');

// Creiamo una variabile reattiva per memorizzare i dati del docente
const faculty = ref(null);

// Recuperiamo l'ID del docente dai parametri della rotta (ad esempio, se usi vue-router)
const route = useRoute();

const router = useRouter();

const emit = defineEmits(['componentReady'])

const goback = () =>{
  router.go(-1);
}

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
  setTimeout(() => {
      emit('componentReady', true)
  }, 2000)
  fetchFaculty(facultyId);
});
</script>

<style scoped>
/* Aggiungi qui eventuali stili per il tuo componente */
</style>