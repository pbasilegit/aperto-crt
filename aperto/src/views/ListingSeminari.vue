<template>
  <main class="head-space-top">

    <div class="tab-riga-bottoni">
      <button :class="{ active: visibleList === 'list1' }" @click="showList('list1')">
        <h4>2024-2025</h4>
      </button>
      <button :class="{ active: visibleList === 'list2' }" @click="showList('list2')">
        <h4>archivio</h4>
      </button>
    </div>
    <section v-if="visibleList === 'list1'" class="tab-content">
      <ul>
        <li v-for="seminario in seminariCorrenti" :key="seminario.id" class="seminario">
          <h3>{{ seminario.title.rendered }}</h3>
          <p>{{ new Date(seminario.date).toLocaleDateString() }}</p>
          <span class="job-title">{{ seminario.job_title }}</span>
        </li>
      </ul>
    </section>
    <section v-if="visibleList === 'list2'" class="tab-content">
      <ul>
        <li v-for="seminario in seminariArchiviati" :key="seminario.id" class="seminario">
          <h3>{{ seminario.title.rendered }}</h3>
          <p>{{ new Date(seminario.date).toLocaleDateString() }}</p>
          <span class="job-title">{{ seminario.job_title }}</span>
          <img :src="seminario.immagine_header.guid"/>

        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const emit = defineEmits(['componentReady'])
const visibleList = ref('list1')


const store = useStore();

const showList = (list) => {
  visibleList.value = list
}
// Chiamata all'azione Vuex per ottenere i seminari
onMounted(() => {
  setTimeout(() => {
    emit('componentReady', true)
  }, 2000)
  store.dispatch('fetchSeminari');
});

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

.seminario {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-title {
  font-weight: bold;
  color: #666;
}
</style>
