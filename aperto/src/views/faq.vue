<template>
  <main class="head-space-top">
    <ul v-if="faqs && faqs.length > 0">
      <li v-for="(faq, index) in faqs" :key="faq.id">
     
        <div class="accordion-item">
          <div class="accordion-header" @click="toggle(index)">
            <h2 v-html="faq.title.rendered"></h2>
            <img :src="activeIndex === index ? upArrow : downArrow" alt="Toggle arrow">
          </div>
 
          <div class="accordion-content accordion-content-faq" v-show="activeIndex === index" v-html="faq.content.rendered" ></div>
        </div>
        <hr>
      </li>
    </ul>
  </main>
</template>

<script>
import { ref, onMounted, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'faq',
  setup(_, { emit }) {
    // Inietta Axios
    const store = useStore();

    const faqs = computed(() => store.getters.faqs)
    // Definizione delle variabili reattive
  
    const loading = ref(true);
    const error = ref(null);

    const activeIndex = ref(null);

    const toggle = (index) => {
      
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    const fetchData = async () => {
      if (store.state.faqs.length === 0) {
        await store.dispatch('fetchFAQs');
      }
    };

    // Effettua la chiamata API quando il componente viene montato
    onMounted(() => {
      fetchData();
      setTimeout(() => {
        emit('componentReady', true);
      }, 
      100)
    });

    // Restituisce le variabili reattive per l'uso nel template
    return {
      faqs,
      error,
      toggle,
      activeIndex,
      downArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_down.svg', // Path to your down arrow image
      upArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_up.svg',
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  font-size: 1.2em;
}

div {
  font-size: 1em;
}
</style>
