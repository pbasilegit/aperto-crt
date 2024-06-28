<template>
  
  <main id="home">
    <!--Inizio Hero mobile -->
    <header class="mobile-hero">
      <div>
        <!-- prima immagine header mobile -->
        <div :class="['sticky-image', { sticky: isSticky }]">
          <img src="../../public/logo_01.svg" alt="aperto logo" style="width: 100%;">
        </div>

        <!-- Testo introduttivo -->
        <div class="hero-content" @scroll="handleScroll" ref="hero-content">

          <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
          <h1>Aperto</h1>
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p>
        </div>
      </div>
      <img src="../../public/logo_02.svg" alt="aperto logo" style="width: 100%;">
    </header>
    <!--Fine Hero mobile -->

    <!--Inizio Hero desktop -->
    <header class="desktop-hero">
      <div style="display: grid; grid-template-columns: 1fr 2fr; margin-top: 100px;">
        <!-- prima immagine header mobile -->
        <div :class="['sticky-image', { sticky: isSticky }]" style="align-self: flex-start;  padding: 10px">
          <img src="../../public/dkstp_logo_01.svg" alt="aperto logo" style="width: 100%;">
        </div>

        <!-- Testo introduttivo -->
        <div class="hero-content" @scroll="handleScroll" ref="hero-content">

          <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
          <h1>Aperto</h1>
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p>
          <div style="display: flex;">
            <div style="flex-basis: 50%; padding: 10px">
              <img src="../../public/dkstp_logo_02.svg" alt="aperto logo" style="width: 100%;">
            </div>

            <div style="flex-basis: 50%; padding: 10px;">
              <img src="../../public/dkstp_logo_03.svg" alt="aperto logo" style="width: 100%;">
            </div>
          </div>
        </div>
      </div>

    </header>
    <!--Fine Hero desktop -->

    <!--Inizio lista seminari 2024-->

    <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
    <h2>Seminari 2024</h2>

    <img class="tipografia-2024" src="../../public/2024.svg" alt="aperto logo">

    <section class="homeSeminari-lista--elemento" v-for="seminario in sortedSeminari" :key="seminario.id">

      <!--Archiviato e Corrente-->
      <router-link v-if="seminario.stato[0].name === 'Archiviato' || seminario.stato[0].name == 'Corrente' " 
                        :to="{ name: 'Seminario', params: { id: seminario.id } }" :class="[{'homeSeminari--elementoCorrente' : seminario.stato[0].name == 'Corrente' }]">

        <p class="homeSeminari-lista--numero">Seminario {{ seminario.seminari_numero }}</p>

        <p  class="homeSeminari-lista--stato">{{ seminario.stato[0].name == 'Archiviato' ? 'Closed' : 'Open Call' }}</p>

        <button v-if="seminario.stato[0].name == 'Corrente' "> <img src="../../public/arrow_left.svg" alt="scopri di più"></button>

        <h2>{{ seminario.title.rendered }}</h2>
        <h3>{{ seminario.seminario_data_inizio }}</h3>

      </router-link>

      <!-- Futuro-->

      <a v-else>
        <p class="homeSeminari-lista--numero">Seminario {{ seminario.seminari_numero }}</p>

        <p  class="homeSeminari-lista--stato">Coming soon</p>

        <h2>{{ seminario.title.rendered }}</h2>
        <h3>{{ seminario.seminario_data_inizio }}</h3>

      </a>



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
      console.log('somma', contentEl.scrollTop + contentEl.clientHeight)
      if (contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight) {
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
