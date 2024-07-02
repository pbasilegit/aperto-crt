<template>

  <main>
    <section id="intro" class="head-space-top">
      <p v-if="testoAbout" v-html="testoAbout.content.rendered"></p>
    </section>
    <hr>
    <div class="accordion-item">
      <div class="accordion-header" @click="toggle(0)">
        <h3>PARTNER ISTITUZIONALI</h3>
        <img :src="activeIndex === 0 ? upArrow : downArrow" alt="Toggle arrow">
      </div>
      <div v-show="activeIndex === 0" class="accordion-content partner">

        <div class="elemento-partner" v-for="(partner, index) in filteredPartners" :key="index"  @click="openModal(index)">
          <img v-if="partner.aggiungi_a_pagina_about_partner === '1'" :src="partner.logo_partner.guid"
            :alt="partner.nome_partner">

          <Modal :text="partner.partnership_info" :imagePath="partner.logo_partner.guid" :index="index"
            :visibleIndex="visibleIndex" @update:visibleIndex="updateVisibleIndex" />


          <div v-if="partner.aggiungi_a_pagina_about_partner === '1'" class="maggiori-informazioni" role="button">
            <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg" alt="Maggiori informazioni">
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="accordion-item">
      <div class="accordion-header" @click="toggle(1)">
        <h3>PROMOTORE</h3>
        <img :src="activeIndex === 1 ? upArrow : downArrow" alt="Toggle arrow">
      </div>
      <div v-show="activeIndex === 1" class="accordion-content partner" >
        <div class="elemento-partner" v-for="(partner, index) in filteredPromoters" :key="index" @click="openModal(index)">

          <img v-if="partner.aggiungi_a_pagina_about_come_organizzatore === '1'" :src="partner.logo_partner.guid"
            :alt="partner.nome_partner">

          <Modal :text="partner.partnership_info" :imagePath="partner.logo_partner.guid" :index="index"
            :visibleIndex="visibleIndex" @update:visibleIndex="updateVisibleIndex" />


          <div v-if="partner.aggiungi_a_pagina_about_come_organizzatore === '1'" class="maggiori-informazioni"
            role="button">
            <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/plus.svg" alt="Maggiori informazioni">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, inject, computed, nextTick } from 'vue';
import Modal from './../components/Modal.vue';


export default {
  name: 'About',
  components: {
    Modal
  },
  setup() {
    const testoAbout = ref(null);
    const partnerDetails = ref(null);
    const activeIndex = ref(null);
    const visibleIndex = ref(-1);
    const filteredPartners = ref([]);
    const filteredPromoters = ref([])

    const axios = inject('axios');

    const openModal = (index) => {
      console.log(index)
      visibleIndex.value = index;
    };


    const fetchAboutText = async () => {
      try {
        const response = await axios.get('/wp/v2/pages/103');
        testoAbout.value = response.data;
      } catch (error) {
        console.error('Errore nel recuperare i seminari:', error);
      }
    };

    const updateVisibleIndex = (index) => {
      visibleIndex.value = index;
    };

    const toggle = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get('/wp/v2/partnership');
        partnerDetails.value = response.data;
        filterPartners();
        filterPromoters();
      } catch (error) {
        console.error('Errore nel recuperare i dettagli del seminario:', error);
      }
    };

    const filterPartners = () => {
      filteredPartners.value = partnerDetails.value.filter(partner => partner.aggiungi_a_pagina_about_partner === '1');
    };

    const filterPromoters = () => {
      filteredPromoters.value = partnerDetails.value.filter(partner => partner.aggiungi_a_pagina_about_come_organizzatore === '1');
    }

    onMounted(() => {
      fetchAboutText();
      fetchPartnerDetails()
    });
    return {
      partnerDetails,
      fetchPartnerDetails,
      testoAbout,
      activeIndex,
      downArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_down.svg',
      upArrow: 'https://www.aperto-crt.it/core/wp-content/uploads/2024/07/arrow_up.svg',
      visibleIndex,
      toggle,
      filteredPartners,
      filteredPromoters,
      updateVisibleIndex,
      openModal
    }
  }
}
</script>