<template>
      <main class="head-space-top">
      <section>  
      <ul class="accordion-content">
        <li class="accordion-content--partecipante" v-for="partecipante in partecipanti" :key="partecipante.id">
          <p class="accordion-content--partecipante--nome">{{ partecipante.title.rendered }}</p>
          <p class="accordion-content--partecipante--job-title">{{ partecipante.job_title }}</p>
        </li>
      </ul>
    </section>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted, inject , computed, defineEmits} from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const emit = defineEmits(['componentReady'])

  onMounted(() => {
    emit('componentReady', false);
    store.dispatch('fetchPartecipanti');  
    setTimeout(() => {
      emit('componentReady', true)
    }, 1000)
  });
 const partecipanti = computed(() => store.getters.partecipanti);
 
  </script>
  
