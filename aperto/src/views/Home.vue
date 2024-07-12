<template>
  
  <main id="home">
    <!--Inizio Hero mobile -->
    <header class="mobile-hero">
      <div>
        <!-- prima immagine header mobile -->
        <div :class="['sticky-image', { sticky: isSticky }]" id="logo_01_mobile">
          <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/logo_01.svg" alt="aperto logo" style="width: 100%;">
        </div>

        <!-- Testo introduttivo -->
        <div class="hero-content" @scroll="handleScroll" ref="hero-content" id="hero-content--mobile">

          <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
          <h1>Aperto</h1>
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p>
        </div>
      </div>
      <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/logo_02.svg" alt="aperto logo" style="width: 100%;">
    </header>
    <!--Fine Hero mobile -->

    <!--Inizio Hero desktop -->
    <header class="desktop-hero">
      <div class="desktop-hero--container">
        <!-- prima immagine header desktop -->
        <div :class="['sticky-image', { sticky: isSticky }]" style="align-self: flex-start;" id="logo_01">
          <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/dkstp_logo_01.svg" alt="aperto logo" class="desktop-hero--img" >
        </div>

        <!-- Testo introduttivo -->
        <div id="hero-content--desktop" class="hero-content" @scroll="handleScroll" ref="hero-content">

          <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
          <h1>Aperto</h1>
          <p id="intro" v-if="testoHome" v-html="testoHome.content.rendered"></p>
          <div style="display: flex;">
            <div style="flex-basis: 50%;" class="desktop-hero--img">
              <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/dkstp_logo_02.svg" alt="aperto logo" style="width: 100%;">
            </div>

            <div style="flex-basis: 50%;" class="desktop-hero--img">
              <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/dkstp_logo_03.svg" alt="aperto logo" style="width: 100%;">
            </div>
          </div>
        </div>
      </div>

    </header>
    <!--Fine Hero desktop -->

    <!-- IMMAGINE ULTIMO SEMINARIO ARCHIVIATO-->
    <img :src="linkImmagineHeaderRecente"/>
    <p>{{ numeroSeminario }}</p>
    <!--Inizio lista seminari 2024-->


    <!--questo titolo non è visibile ha una posizione absolute fuori dal viewport-->
    <h2>Seminari 2024</h2>

    <img class="tipografia-2024" src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/2024.svg" alt="aperto logo">

    <section class="homeSeminari-lista--elemento" v-for="seminario in sortedSeminari" :key="seminario.id">

      <!--Archiviato e Corrente-->
      <router-link v-if="seminario.stato[0].name === 'Archiviato' || seminario.stato[0].name == 'Corrente' " 
                        :to="{ name: 'Seminario', params: { id: seminario.id } }" :class="[{'homeSeminari--elementoCorrente' : seminario.stato[0].name == 'Corrente' }]">

        <p class="homeSeminari-lista--numero">Seminario {{ seminario.seminari_numero }}</p>

        <p  class="homeSeminari-lista--stato">{{ seminario.stato[0].name == 'Archiviato' ? 'Closed' : 'Open Call' }}</p>

        <button v-if="seminario.stato[0].name == 'Corrente' "> <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_left.svg" alt="scopri di più"></button>

        <h2>{{ seminario.title.rendered }}</h2>
        <h3>{{ formatSeminarioDate(seminario.seminario_data_inizio, seminario.seminario_data_fine) }}</h3>

      </router-link>

      <!-- Futuro-->

      <a v-else>
        <p class="homeSeminari-lista--numero">Seminario {{ seminario.seminari_numero }}</p>

        <p  class="homeSeminari-lista--stato">Coming soon</p>

        <h2>{{ seminario.title.rendered }}</h2>
        <h3>{{ formatSeminarioDate(seminario.seminario_data_inizio, seminario.seminario_data_fine) }}</h3>

      </a>
    </section>
  </main>
</template>




<script>
import { defineComponent, ref, computed, onMounted, onBeforeMount, inject, defineEmits,onUnmounted } from 'vue';

export default {
  name: 'Home',
  setup(_, { emit }) {
    const seminari = ref([]);
    const axios = inject('axios');
    const isSticky = ref(true);
    const content = ref(null);
    const testoHome = ref(null);
    const linkImmagineHeaderRecente = ref(null);
    const numeroSeminario = ref(null);


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

    // Aggiornare la variabile ref con il seminario archiviato più recente
    // Aggiornare la variabile ref con il link dell'immagine header del seminario archiviato più recente
    const updateLinkImmagineHeaderRecente = () => {
     
      const archiviati = sortedSeminari.value.filter(seminario => seminario.stato[0].name === 'Archiviato');
      
      if (archiviati.length > 0) {
        linkImmagineHeaderRecente.value = archiviati[archiviati.length - 1].immagine_header.guid;
        numeroSeminario.value = archiviati[archiviati.length - 1].seminari_numero;
        console.log('update', archiviati[1])
      } else {
        linkImmagineHeaderRecente.value = null; // O qualsiasi valore che desideri restituire se non ci sono seminari archiviati
      }
    };

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
      updateLinkImmagineHeaderRecente();

    };
    function updateMarginTop() {
      const navElement = document.getElementById('myNav');
      let navHeight = 0;
      const herocontentDesktop = document.getElementById('hero-content--desktop')
      const stickyimage = document.getElementById('logo_01');
      let stickyimageMobile = document.getElementById('logo_01_mobile');
      const herocontentMobile = document.getElementById('hero-content--mobile')
     
      if(window.innerWidth  < 768){
        /**MOBILE */
        

        navHeight = '5'

        stickyimageMobile.style.top = `${navHeight}vh`;
        stickyimageMobile.style.top = stickyimageMobile.style.top + 10;
        console.log('Sono in MoBILE RESIZE', stickyimageMobile.style.top);
        herocontentMobile.style.marginTop = `${navHeight}vh`;
       
      }else{
        /**DESKTOP */
        navHeight = navElement.getBoundingClientRect().height;
        console.log('Sono in DESKTOP RESIZE', navHeight, 'px');
        herocontentDesktop.style.marginTop = `${navHeight + 20}px`;
        stickyimage.style.top = `${navHeight}px`;
        navHeight = 0;
      }
    
    }

    function init(){}

    onMounted(() => {
      fetchSeminari();
      loadTestoHome();
      window.addEventListener('scroll', updateMarginTop);

      const contentEl = content.value;
      setTimeout(() => {
        emit('componentReady', true);
      }, 
      1000)
      const stickyimage = document.getElementById('logo_01');
      const herocontentDesktop = document.getElementById('hero-content--desktop')
      const stickyimageMobile = document.getElementById('logo_01_mobile');
      const herocontentMobile = document.getElementById('hero-content--mobile')
      let navHeight = 0;


      if(window.innerWidth  <= 768 || window.innerHeight <= 768){
        console.log('mobile MOUNTED')
        navHeight = '5'
        stickyimageMobile.style.top = `${navHeight}vh`;
        stickyimageMobile.style.top = stickyimageMobile.style.top + 10;
        herocontentMobile.style.marginTop = `${navHeight}vh`;
      }
      if(window.innerWidth > 768 & window.innerWidth <= 1440){
        console.log('desktop MOUNTED')
        herocontentDesktop.style.marginTop = `120px`;
        stickyimage.style.top = `100px`;
      }
      if(window.innerWidth > 1440){
        console.log('desktop 2 MOUNTED')
        herocontentDesktop.style.marginTop = `140px`;
        stickyimage.style.top = `120px`;
        console.log('Altezza top:', stickyimage, 'px'); 
      }
     
    });


    onBeforeMount(() =>{ 
      emit('componentReady', false);
    // Fa scorrere la pagina all'inizio prima di montare il componente
      window.scrollTo(0, 0);
      window.addEventListener("load", () => {
        console.log("page is fully loaded");
        updateMarginTop
      });
      window.addEventListener('resize', updateMarginTop);

    });

    onUnmounted(() => {
      window.removeEventListener('scroll',updateMarginTop);
      window.removeEventListener('resize',updateMarginTop);
    });

    return {
      seminari,
      formatSeminarioDate,
      isSticky,
      handleScroll,
      sortedSeminari,
      content,
      testoHome,
      linkImmagineHeaderRecente,
      numeroSeminario,
      updateLinkImmagineHeaderRecente
    };
  }
};
</script>
