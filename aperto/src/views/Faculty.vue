<template>


  <main class="head-space-top">
    <div class="tab-riga-bottoni">
      <button :class="{ active: visibleList === 'list1' }" @click="showList('list1')">
        <h4>STAFF</h4>
      </button>
      <button :class="{ active: visibleList === 'list2' }" @click="showList('list2')">
        <h4>GUEST</h4>
      </button>
    </div>

    <section v-if="visibleList === 'list1'" class="tab-content">

      <ul class="accordion-content">
        <li class="accordion-content--persona" v-for="faculty in guestFaculties" :key="faculty.id">
          <p class="nome">{{ faculty.title.rendered }}</p>
          <p class="job-title">{{ faculty.job_title }}</p>
        </li>
      </ul>
    </section>

    <section v-if="visibleList === 'list2'" class="tab-content">

      <ul class="accordion-content">
        <li class="accordion-content--persona" v-for="faculty in staffFaculties" :key="faculty.id">
          <p class="nome"> {{ faculty.title.rendered }}</p>
          <p class="job-title">{{ faculty.job_title }}</p>
          <img class="freccia-destra" src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_right.svg" alt="Maggiori informazioni">
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { ref, inject } from 'vue'

const visibleList = ref('list1')
const axios = inject('axios');

const showList = (list) => {
  visibleList.value = list
}

// Dichiariamo due array per ospitare le facoltà guest e staff
let guestFaculties = [];
let staffFaculties = [];

// Funzione per ottenere i dati dei docenti tramite Axios
const fetchFaculties = async () => {
  try {
    const response = await axios.get('https://www.aperto-crt.it/core/wp-json/wp/v2/faculty');

    // Dividiamo i dati in guest e staff
    response.data.forEach(faculty => {
      if (faculty['faculty_member-type'].name === 'guest') {
        guestFaculties.push(faculty);
      } else {
        staffFaculties.push(faculty);
      }
    });
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei docenti', error);
  }
};

// Chiamata a fetchFaculties quando il componente viene montato
fetchFaculties();
</script>
