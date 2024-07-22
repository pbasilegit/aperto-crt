<template>

  <main v-if="seminarDetails">

    <header class="head-space-top">
      <h1>{{ seminarDetails.title.rendered }}</h1>
    </header>
    <hr>
    <section class="data-luogo">
      <h2>{{ formattedDate }}</h2>
      <h2 v-html="seminarDetails.seminario_location"></h2>
    </section>

    <div v-if="seminarDetails.stato[0].name === 'Archiviato'" class="seminario-header-image"
      :style="{ 'background-image': 'url(' + seminarDetails.immagine_header.guid + ')' }">
    </div>


    <hr v-if="seminarDetails.stato[0].name === 'Corrente'">

    <section id="intro">
      <p v-html="truncatedDescription"></p>
      <button @click="toggleMoreDescription" class="bottone-toggle">
        <img
          :src="showMoreDescription ? 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/menus.svg' : 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg'"
          alt="Toggle Description" />
      </button>

    </section>
    <hr>

    <!-- FACULTY -->
    <div class="accordion-item">
      <div class="accordion-header" @click="toggle(0)">
        <h3>DOCENTI</h3>
        <img :src="activeIndex === 0 ? upArrow : downArrow" alt="Toggle arrow">
      </div>

      <div v-show="activeIndex === 0" class="accordion-content row-grap-big">
        <div class="accordion-elementi" v-for="(faculty, index) in seminarDetails.seminario_faculty_member"
          :key="faculty.id">

          <img :src="faculty.faculty_member_foto" :alt="faculty.post_title">
          <h4>{{ faculty.post_title }}</h4>

          <p>
            {{ truncatedBio(faculty, index) }}
            <span v-if="shouldShowMore(faculty)" class="more-toggle "></span>
          </p>

          <button @click="toggleMore(index)" class="bottone-toggle">
            <img
              :src="showMoreIndices.includes(index) ? 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/menus.svg' : 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg'"
              alt="Toggle" />
          </button>
        </div>
      </div>
    </div>
    <hr v-if="seminarDetails.seminario_partner_nome.length > 0">

    <!-- PARTNER -->
    <div class="accordion-item" v-if="seminarDetails.seminario_partner_nome.length > 0">
      <div class="accordion-header" @click="toggle(1)">
        <h3>PARTNER</h3>
        <img :src="activeIndex === 1 ? upArrow : downArrow" alt="Toggle arrow">
      </div>
      <div v-show="activeIndex === 1" class="accordion-content partner">
        <div class="elemento-partner" v-for="(partner, index) in seminarDetails.seminario_partner_nome"
          :key="partner.id" @click="openModal(index)">
          <img :src="partner.logo_partner" :alt="partner.nome_partner">


          <Modal :text="partner.partnership_info" :imagePath="partner.logo_partner" :index="index"
            :visibleIndex="visibleIndex" @update:visibleIndex="updateVisibleIndex" />


          <div class="maggiori-informazioni" role="button">
            <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg" alt="Maggiori informazioni">
          </div>
        </div>
      </div>
    </div>
    <hr>

    <!-- ORGANIZZATORE -->
    <div class="accordion-item">
      <div class="accordion-header" @click="toggle(2)">
        <h3>ORGANIZZATORE</h3>
        <img :src="activeIndex === 2 ? upArrow : downArrow" alt="Toggle arrow">
      </div>

      <div v-show="activeIndex === 2" class="accordion-content partner">
        <div class="elemento-partner" v-for="(promotore, index) in seminarDetails.seminario_promotore_nome"
          :key="promotore.id" @click="openModal(index)">
          <img :src="promotore.logo_partner" :alt="promotore.nome_partner">

          <Modal :text="promotore.partnership_info" :imagePath="promotore.logo_partner" :index="index"
            :visibleIndex="visibleIndex" @update:visibleIndex="updateVisibleIndex" />
          <div class="maggiori-informazioni" role="button">
            <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg" alt="Maggiori informazioni">
          </div>
        </div>
      </div>
    </div>

    <!-- SCARICA IL BANDO -->
    <div class="accordion-item download-bando" v-if="seminarDetails.stato[0].name === 'Corrente'">
      <a class="accordion-header" :href="seminarDetails.seminario_allegati[0].guid" target="_blank">
        <h3>SCARICA IL BANDO</h3>
        <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_download.svg" />
      </a>
    </div>

    <!-- IF 'ARCHIVIATO' PARTECIPANTI -->
    <hr v-if="seminarDetails.stato[0].name === 'Archiviato' && seminarDetails.partecipanti_al_seminario.length > 0">
    <div v-if="seminarDetails.stato[0].name === 'Archiviato' && seminarDetails.partecipanti_al_seminario.length > 0" class="accordion-item">
      <div class="accordion-header" @click="toggle(3)">
        <h3>PARTECIPANTI</h3>
        <img :src="activeIndex === 3 ? upArrow : downArrow" alt="Toggle arrow">
      </div>
      <div v-show="activeIndex === 3" class="accordion-content">
        <div class="accordion-content--persona" v-for="partecipante in seminarDetails.partecipanti_al_seminario"
          :key="partecipante.id">
          <p class="nome">{{ partecipante.post_title }}</p>
          <p class="job-title">{{ partecipante.job_title }}</p>
        </div>
      </div>
    </div>

    <!-- IF 'ARCHIVIATO' P GALLERY -->
    <hr v-if="seminarDetails.stato[0].name === 'Archiviato' && seminarDetails.seminario_media.length > 0"  >
    <div v-if="seminarDetails.stato[0].name === 'Archiviato' && seminarDetails.seminario_media.length > 0" class="accordion-item">
      <div class="accordion-header" @click="toggle(4)">
        <h3>GALLERY</h3>
        <img :src="activeIndex === 4 ? upArrow : downArrow" alt="Toggle arrow">

      </div>
      <div v-show="activeIndex === 4" class="accordion-content seminario-gallery-structure">
        <div v-for="(media, index) in seminarDetails.seminario_media" :key="media.ID">

          <div @click="openModalCarousel(index)" v-if="seminarDetails.stato[0].name === 'Archiviato'"
            class="seminario-gallery--image" :style="{ 'background-image': 'url(' + media.guid + ')' }">
            <div class="seminario-gallery-image--showmore"></div>
          </div>

        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModalCarousel" class="modal-overlay" @click.self="closeModalCarousel">
        <div class="modal-carousel-container">
          <div class="close-button" @click="closeModalCarousel">
            <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/Plus_bianco.svg" />
          </div>
          <div class="carousel">
            <img :src="seminarDetails.seminario_media[currentIndex].guid" class="carousel-image" />
          </div>
            <div class="carousel-ui">
              <p class="carousel-didascalia">
                {{seminarDetails.seminario_media[currentIndex].post_content}}
              </p>
              <div class="carousel-commands">
                <button class="prev-button" @click="prevImage">&#10094;</button>
                <button class="next-button" @click="nextImage">&#10095;</button>
              </div>
            </div>
        </div>
      </div>
    </div>


  </main>
  <p v-else>Caricamento...</p>

</template>

<script>
import { ref, onMounted, inject, computed, onBeforeMount, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Modal from './../components/Modal.vue';
import { useStore } from 'vuex';

export default {
  name: 'Seminario',
  components: {
    Modal
  },
  setup(_, { emit }) {
    const store = useStore();
    const route = useRoute();


    const activeIndex = ref(null);

    const showModalCarousel = ref(false);
    const currentIndex = ref(0);

    const modalText = ref('Hello from the modal! This is a simple modal component.');

    const visibleIndex = ref(-1); // -1 significa che nessuna modale è visibile

    const openModalCarousel = (index) => {
      currentIndex.value = index;
      showModalCarousel.value = true;
    };

    const closeModalCarousel = () => {
      showModalCarousel.value = false;
    };

    const prevImage = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      } else {
        currentIndex.value = seminarDetails.value.seminario_media.length - 1;
      }
    };

    const nextImage = () => {
      if (currentIndex.value < seminarDetails.value.seminario_media.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    };
    const openModal = (index) => {
      visibleIndex.value = index;
    };

    const updateVisibleIndex = (index) => {
      visibleIndex.value = index;
    };

    const toggle = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    const seminarDetails = computed(() => {
      return store.getters.allSeminari.find(seminario => seminario.id === parseInt(route.params.id));
    });

    const fetchData = async () => {
      if (!seminarDetails.value) {
        await store.dispatch('fetchSeminari');
      }
    };

    const formattedDate = computed(() => {
      const startDate = seminarDetails.value["seminario_data_inizio"];
      const endDate = seminarDetails.value["seminario_data_fine"];

      if (startDate && endDate) {
        return formatSeminarDates(startDate, endDate);
      }
      return "";
    });


    function formatSeminarDates(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const startDay = start.getDate();
      const startMonth = monthToString(start.getMonth()); // Converti il numero del mese in stringa completa
      const endDay = end.getDate();
      const endMonth = monthToString(end.getMonth()); // Converti il numero del mese in stringa completa

      if (startMonth === endMonth) {
        return `dal ${startDay} al ${endDay} ${endMonth}`;
      } else {
        return `dal ${startDay} ${startMonth} al ${endDay} ${endMonth}`;
      }
    }

    function monthToString(monthIndex) {
      const months = [
        "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
        "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
      ];
      return months[monthIndex];
    }


    const showMoreIndices = ref([]);
    const showMoreDescription = ref(false);


    const toggleMore = (index) => {
      const i = showMoreIndices.value.indexOf(index);
      if (i > -1) {
        showMoreIndices.value.splice(i, 1);
      } else {
        showMoreIndices.value.push(index);
      }
    };

    const toggleMoreDescription = () => {
      showMoreDescription.value = !showMoreDescription.value;
    };

    const truncatedBio = (faculty, index) => {
      if (showMoreIndices.value.includes(index) || faculty.faculty_member_bio.length <= 400) {
        return faculty.faculty_member_bio;
      } else {
        return faculty.faculty_member_bio.slice(0, 400) + '...';
      }
    };

    const truncatedDescription = computed(() => {
      if (seminarDetails.value.stato[0].name === "Archiviato") {

        if (showMoreDescription.value || seminarDetails.value.seminario_archiviato_descrizione.length <= 400) {
          return seminarDetails.value.seminario_archiviato_descrizione;
        } else {
          return seminarDetails.value.seminario_archiviato_descrizione.slice(0, 400) + '...';
        }

      } else {

        if (showMoreDescription.value || seminarDetails.value.descrizione.length <= 400) {
          return seminarDetails.value.descrizione;
        } else {
          return seminarDetails.value.descrizione.slice(0, 400) + '...';
        }

      }

    });

    const shouldShowMore = (faculty) => {
      return faculty.faculty_member_bio.length > 200;
    };

    const shouldShowMoreDescription = computed(() => {
      return seminarDetails.value.descrizione.length > 400;
    });

    onMounted(() => {
      emit('componentReady', false);
      fetchData()
      setTimeout(() => {
        emit('componentReady', true);
      },
        500)
    });

    onBeforeMount(() => {
      emit('componentReady', false);
      // Fa scorrere la pagina all'inizio prima di montare il componente
      window.scrollTo(0, 0);
    });

    return {
      seminarDetails,
      formattedDate,
      activeIndex,
      showMoreIndices,
      showMoreDescription,
      toggleMore,
      truncatedBio,
      truncatedDescription,
      shouldShowMore,
      shouldShowMoreDescription,
      toggleMoreDescription,
      toggle,
      downArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_down.svg', // Path to your down arrow image
      upArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_up.svg',
      openModal,
      modalText,
      visibleIndex,
      updateVisibleIndex,
      openModalCarousel,
      closeModalCarousel,
      prevImage,
      nextImage,
      currentIndex,
      showModalCarousel
    };
  }
};
</script>
