<template>
    <div>
      <section v-if="seminarDetails">
        <h1>{{ seminarDetails.title.rendered }}</h1>
        <h2>{{ formattedDate }}</h2>
        <h2>{{ seminarDetails.seminario_location }}</h2>
        <section>
          <p>{{ seminarDetails.descrizione }}</p>
        </section>
        
        <div v-for="faculty in seminarDetails.seminario_faculty_member" :key="faculty.id">

          <h4>{{ faculty.post_title }}</h4>
          <p>{{ faculty.faculty_member_bio }}</p>
          <figure>
            <img :src="faculty.faculty_member_foto" :alt="faculty.post_title" style="width:100%">
            <figcaption></figcaption>
          </figure>
        </div>

        <div v-for="partner in seminarDetails.seminario_partner_nome" :key="partner.id">
          <figure>
            <img :src="partner.logo_partner" :alt="partner.nome_partner" style="width:100%">
            <figcaption></figcaption>
          </figure>
          <h4>{{ partner.nome_partner }}</h4>
        </div>

        <div v-for="promotore in seminarDetails.seminario_promotore_nome" :key="promotore.id">
          <figure>
            <img :src="promotore.logo_partner" :alt="promotore.nome_partner" style="width:100%">
            <figcaption></figcaption>
          </figure>
          <h4>{{ promotore.nome_partner }}</h4>
        </div>



      </section>
      <p v-else>Caricamento...</p>
    </div>
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
  
      const fetchSeminarDetails = async () => {
        try {
          const response = await axios.get(`/wp/v2/seminario/${route.params.id}`);
          seminarDetails.value = response.data;
        } catch (error) {
          console.error('Errore nel recuperare i dettagli del seminario:', error);
        }
      };

      const formattedDate = computed(() => {
        const startDate = seminarDetails.value["seminario_data-inizio"];
        const endDate = seminarDetails.value["seminario_data-fine"];

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
  
      onMounted(() => {
        fetchSeminarDetails();
      });
  
      return {
        seminarDetails,
        formattedDate
      };
    }
  };
  </script>
  
  <style scoped>
  /* Aggiungi qui i tuoi stili */
  </style>
  