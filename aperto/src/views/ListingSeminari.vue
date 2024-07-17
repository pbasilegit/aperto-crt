<template>
  <main class="head-space-top">

    <div class="tab-riga-bottoni">
      <button :class="{ active: visibleList === 'list1' }" @click="showList('list1')">
        <h4>2024-25</h4>
      </button>
      <button :class="{ active: visibleList === 'list2' }" @click="showList('list2')">
        <h4>Archivio</h4>
      </button>
    </div>

    <!-- CORRENTI E FUTURI-->
    <section v-if="visibleList === 'list1'" class="tab-content">

        <router-link v-for="seminario in seminariCorrenti" :key="seminario.id" class="seminario" @click="goToSeminario(seminario.id, seminario.stato[0].name)">
          <p>Seminario {{ seminario.seminari_numero }}</p>

          <h3>{{ seminario.title.rendered }}</h3>
          <p>{{ formatSeminarioDate(seminario.seminario_data_inizio, seminario.seminario_data_fine) }}</p>
          <img v-if="seminario.stato[0].name == 'Corrente'"  src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_left.svg" alt="scopri di più" />

          <p class="homeSeminari-lista--stato" v-else >coming soon </p>

        </router-link>

    </section>

    <!-- ARCHIVIATI-->
    <section v-if="visibleList === 'list2'" class="tab-content">
      <ul>
        <li v-for="seminario in seminariArchiviati" :key="seminario.id" class="seminario" @click="goToSeminario(seminario.id)">
          <img :src="seminario.immagine_header.guid"/>
          <p>{{ seminario.seminario_location }}</p>

          <h3>{{ seminario.title.rendered }}</h3>
          <p>{{ formatSeminarioDate(seminario.seminario_data_inizio, seminario.seminario_data_fine) }}</p>
          <img v-if="seminario.stato[0].name == 'Archiviato'" src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_left.svg" alt="scopri di più" />

        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const emit = defineEmits(['componentReady'])
const visibleList = ref('list1')
const route = useRouter();

const store = useStore();

const showList = (list) => {
  visibleList.value = list
}
// Chiamata all'azione Vuex per ottenere i seminari
onMounted(() => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    emit('componentReady', true)
  }, 2000)
  store.dispatch('fetchSeminari');
});

const goToSeminario = (id, stato) =>{
  if(stato != 'Futuro'){
    route.push('/seminario/' + id)
  }

}

const formatSeminarioDate = (dataInizio, dataFine) => {
      const inizio = new Date(dataInizio);
      const fine = new Date(dataFine);
      const annoInizio = inizio.getFullYear();


      const giornoInizio = inizio.getDate();
      const meseInizio = inizio.toLocaleString('it-IT', { month: 'long' });
      const giornoFine = fine.getDate();
      const meseFine = fine.toLocaleString('it-IT', { month: 'long' });

      if (meseInizio === meseFine) {
        return `dal ${giornoInizio} al ${giornoFine} ${meseInizio} ${annoInizio}`;
      } else {
        return `dal ${giornoInizio} ${meseInizio} al ${giornoFine} ${meseFine} ${annoInizio}`;
      }
    }
// Getter per ottenere i seminari correnti e archiviati dal Vuex store
const seminariCorrenti = computed(() => store.getters.seminariCorrenti);
const seminariArchiviati = computed(() => store.getters.seminariArchiviati);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}

img{
  max-width: 200px;
}



</style>
