<template>

      <main v-if="seminarDetails">
        <hr>
        <header>
        <h1>{{ seminarDetails.title.rendered }}</h1>
        </header>
       <hr>
        <section class="data-luogo">
        <h2>{{ formattedDate }}</h2>
        <h2>{{ seminarDetails.seminario_location }}</h2>
        </section>
        <hr>
        <section id="intro">
          <p v-html="truncatedDescription">
           
          </p>
          <button @click="toggleMoreDescription"> {{ showMoreDescription ? '-' : '+' }}</button>
        </section>
        <hr>
        <!-- FACULTY -->
        <div class="accordion-item">
          <div class="accordion-header" @click="toggle(0)">
            <h3>DOCENTI</h3>
            <img :src="activeIndex === 0 ? upArrow : downArrow" alt="Toggle arrow">
          </div>

          <div v-show="activeIndex === 0" class="accordion-content row-grap-big">
            <div class="accordion-elementi" v-for="(faculty, index) in seminarDetails.seminario_faculty_member" :key="faculty.id">
              <div class="colonne">
                <figure>
                  <img :src="faculty.faculty_member_foto" :alt="faculty.post_title">
                  <figcaption></figcaption>
                </figure>
                <h4>{{ faculty.post_title }}</h4>
              </div>
              <p>
                {{ truncatedBio(faculty, index) }}
                <span v-if="shouldShowMore(faculty)"  class="more-toggle">
                  
                </span>
                
              </p>
              <button @click="toggleMore(index)">{{ showMoreIndices.includes(index) ? '-' : '+' }}</button>
            </div>
          </div>
        </div>
        <hr>
        <!-- PARTNER -->
        <div class="accordion-item">
          <div class="accordion-header" @click="toggle(1)">
            <h3>PARTNER</h3>
            <img :src="activeIndex === 1 ? upArrow : downArrow" alt="Toggle arrow">
          </div>
          <div v-show="activeIndex === 1" class="accordion-content partner">
            <div class="elemento-partner" v-for="partner in seminarDetails.seminario_partner_nome" :key="partner.id">
                <img :src="partner.logo_partner" :alt="partner.nome_partner">
             <!-- <h4>{{ partner.nome_partner }}</h4>
              <p>{{ partner.partnership_info }}
              </p>
            -->
              <div class="maggiori-informazioni" role="button">
                <img src="../../public/plus.svg" alt="Maggiori informazioni" >
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="accordion-item">
          <div class="accordion-header" @click="toggle(2)">
            <h3>ORGANIZZATORE</h3>
            <img :src="activeIndex === 2 ? upArrow : downArrow" alt="Toggle arrow">
          </div>

          <div v-show="activeIndex === 2" class="accordion-content partner">
            <div class="elemento-partner" v-for="promotore in seminarDetails.seminario_promotore_nome" :key="promotore.id">
                <img :src="promotore.logo_partner" :alt="promotore.nome_partner">
                <div class="maggiori-informazioni" role="button">
                <img src="../../public/plus.svg" alt="Maggiori informazioni" >
              </div>
            </div>
          </div>
        </div>

       
      </main>
      <p v-else>Caricamento...</p>

  </template>
  
  <script>
  import { ref, onMounted, inject , computed} from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'Seminario',
    setup() {
      const route = useRoute();
      const seminarDetails = ref(null);
      const axios = inject('axios');

      const activeIndex = ref(null);

      const toggle = (index) => {
        activeIndex.value = activeIndex.value === index ? null : index;
      };
  
      const fetchSeminarDetails = async () => {
        try {
          const response = await axios.get(`/wp/v2/seminario/${route.params.id}`);
          seminarDetails.value = response.data;
        } catch (error) {
          console.error('Errore nel recuperare i dettagli del seminario:', error);
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
          return `${startDay} al ${endDay} ${endMonth}`;
        } else {
          return `${startDay} ${startMonth} al ${endDay} ${endMonth}`;
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
      if(seminarDetails.value.stato[0].name === "Archiviato"){

        if (showMoreDescription.value || seminarDetails.value.seminario_archiviato_descrizione.length <= 400) {
          return seminarDetails.value.seminario_archiviato_descrizione;
        } else {
          return seminarDetails.value.seminario_archiviato_descrizione.slice(0, 400) + '...';
        }

      }else{

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
        fetchSeminarDetails();
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
        downArrow: '../../public/arrow_down.svg', // Path to your down arrow image
        upArrow: '../../public/arrow_up.svg', 
      };
    }
  };
  </script>
  
