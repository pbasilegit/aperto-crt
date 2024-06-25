<template>



  <main id="home">
    <!--Inizio Hero-->
    <div>
      <!-- prima immagine header mobile -->
      <div :class="['sticky-image', { sticky: isSticky }]"> 
        <img class="mobile-hero-image" src="../../public/logo_01.svg" alt="aperto logo"> 
      </div>

        <!-- Testo introduttivo -->
        <div class="hero-content" @scroll="handleScroll" ref="hero-content" style="border: 5px solid blue"> 
          
          <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
          <h1>Aperto</h1>
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p> 
        </div>
    </div>
  <img class="mobile-hero-image" src="../../public/logo_02.svg" alt="aperto logo">

    <!--Inizio lista seminari 2024-->

    <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
    <h2>Seminari 2024</h2>

    <img class="tipografia-2024" src="../../public/2024.svg" alt="aperto logo">

      <section class="homeSeminari-lista--elemento" v-for="seminario in sortedSeminari" :key="seminario.id">
        <router-link :to="{ name: 'Seminario', params: { id: seminario.id } }">
          <header>
            <p>Seminario {{ seminario.seminari_numero }}</p>
            <p>{{ seminario.stato[0].name }}</p>
          </header>
          <h2>{{ seminario.title.rendered }}</h2>
          <h3 style="color:red;  margin-bottom: 10px;">{{ seminario.seminario_data_inizio }}</h3>
        </router-link>
      </section>
    </main>
</template>




<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, inject } from 'vue';

export default {
  name: 'Home',
  setup() {
    const seminari = ref([]);
    const axios = inject('axios');
    const isSticky = ref(true);
    const content = ref(null);
    const testoHome = ref(null);

    const handleScroll = () => {
      const contentEl = content.value;
      console.log('scroll top', contentEl.scrollTop)
      console.log('clientHeight', contentEl.clientHeight)
      console.log('scrollHeight', contentEl.scrollHeight)
      console.log('somma',contentEl.scrollTop + contentEl.clientHeight )
      if (contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight ) {
        isSticky.value = false;
      } else {
        isSticky.value = true;
      }
    };

    const sortedSeminari = computed(() => {
      return seminari.value.slice().sort((a, b) => {
        const stateOrder = {
          'Futuro': 3,
          'Corrente': 2,
          'Archiviato': 1
        };
        
        if (stateOrder[a.stato[0].name] < stateOrder[b.stato[0].name]) {
          return -1;
        } else if (stateOrder[a.stato[0].name] > stateOrder[b.stato[0].name]) {
          return 1;
        } else {
          // Se entrambi hanno lo stesso stato, ordinamento per data
          const dateA = new Date(a['seminario_data_inizio']);
          const dateB = new Date(b['seminario_data_inizio']);
          return dateA - dateB;
        }
      });
    });


    const loadTestoHome = async () => {
      const response = await axios.get('/wp/v2/pages/2')
      testoHome.value = response.data
    }

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
      loadTestoHome();
      const contentEl = content.value;
    });

    return {
      seminari,
      isSticky,
      handleScroll,
      sortedSeminari,
      content,
      testoHome,
      paragraphs: Array(30).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut lectus euismod, vehicula quam eu, egestas ante.')
    };
  }
};
</script>
