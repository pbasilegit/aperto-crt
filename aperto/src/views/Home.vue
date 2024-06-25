<template>

  <div>
    <div>

      <!-- prima immagine header mobile -->
      <div :class="['sticky-image', { sticky: isSticky }]"> 
        <img class="mobile-hero-image" src="../../public/logo_01.svg" alt="Sticky Image"> 
      </div>

      <!-- prima immagine header desktop -->
      <div :class="['sticky-image', { sticky: isSticky }]"> 
        <img class="desktop-hero-image" src="../../public/ape.svg" alt="Sticky Image"> 
      </div>

      <div class="hero-colonne">

      <!-- immagine r header desktop -->
        <div :class="['sticky-image-r', { sticky: isSticky }]"> 
          <img class="desktop-hero-image immagine-r" src="../../public/r.svg" alt="Sticky Image"> 
        </div>

        <div class="hero-content" @scroll="handleScroll" ref="hero-content" style="border: 5px solid blue"> 
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p> 
        </div>

      </div>


  </div>

      <!-- seconda immagine header mobile -->
  <img class="mobile-hero-image" src="../../public/logo_02.svg" alt="Sticky Image">

  <div class="hero-colonne">
     <!-- seconda immagine header desktop -->
  <img class="immagine-to desktop-hero-image" src="../../public/to.svg" alt="Sticky Image">

</div>



    <h1>2024</h1>
   
      <div v-for="seminario in sortedSeminari" :key="seminario.id">
        <router-link :to="{ name: 'Seminario', params: { id: seminario.id } }">
          {{ seminario.title.rendered }}
          <p style="color:black;">{{ seminario.stato[0].name }}</p>
          <p style="color:red;  margin-bottom: 10px;">{{ seminario.seminario_data_inizio }}</p>
        </router-link>
      </div>
  </div>
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
