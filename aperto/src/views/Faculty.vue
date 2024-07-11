<template>
  <div class="container">
    <div class="buttons">
      <button
        :class="{ active: visibleList === 'list1' }"
        @click="showList('list1')"
      >
        Mostra Lista 1
      </button>
      <button
        :class="{ active: visibleList === 'list2' }"
        @click="showList('list2')"
      >
        Mostra Lista 2
      </button>
    </div>

    <div v-if="visibleList === 'list1'" class="list">
      <h3>Lista 1</h3>
      <ul>
        <li v-for="faculty in guestFaculties" :key="faculty.id">
        {{ faculty.title.rendered }}
      </li>      </ul>
    </div>

    <div v-if="visibleList === 'list2'" class="list">
      <h3>Lista 2</h3>
      <ul>
        <li v-for="faculty in staffFaculties" :key="faculty.id">
        {{ faculty.title.rendered }}
      </li>      </ul>
    </div>
  </div>
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

<style>
.container {
  margin-top: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  margin-bottom: -2px;
}

button {
  position: relative; /* Necessario per posizionare i pseudo-elementi */
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-right: -10px; /* Sovrapposizione dei bottoni */
  z-index: 1; /* Assicurarsi che i bottoni attivi siano sopra */
  border-bottom: none; /* Rimuove il bordo inferiore */

  /* Utilizzo dell'immagine SVG come sfondo */
  background-image: url('https://www.aperto-crt.it/core/wp-content/uploads/2024/07/tab_element.svg');
  background-size: cover; /* Adatta l'immagine alla dimensione del pulsante */
  background-repeat: no-repeat; /* Evita la ripetizione dell'immagine */
  border-bottom: 1px black solid;
}





button.active {
  z-index: 2; /* Assicurarsi che il bottone attivo sia sopra */
  border-bottom: none;
  color: white;
  border-bottom: white;
}

button.active::after {
  content: none;
}

.list {
  border: 2px solid #333;
  padding: 20px;
  background-color: #f9f9f9;
  width: 80%; /* Adatta la larghezza alla vista */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
