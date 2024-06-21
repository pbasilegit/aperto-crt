<template>
  <div>
    <div>
    <div :class="['sticky-image', { sticky: isSticky }]">
      <img src="../../public/logo_01.svg" alt="Sticky Image">
    </div>
    <div class="content" @scroll="handleScroll" ref="content" style="border: 5px solid blue">
        <p v-if="testoHome" v-html="testoHome.content.rendered"></p>

        <h1 style="border: 5px solid red"> TESTO PER FARE VOLUME</h1>
        <p v-if="testoHome" v-html="testoHome.content.rendered"></p><br>
        <p v-if="testoHome" v-html="testoHome.content.rendered"></p>

    </div>

  </div>
  <img src="../../public/logo_02.svg" alt="Sticky Image">

    <h1>Elenco dei Seminari</h1>
   
      <div v-for="seminario in seminari" :key="seminario.id">
        <router-link :to="{ name: 'Seminario', params: { id: seminario.id } }">
          {{ seminario.title.rendered }}
        </router-link>
      </div>


    
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, inject } from 'vue';

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

    onMounted(() => {
      const contentEl = content.value;
      contentEl.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      const contentEl = content.value;
      contentEl.removeEventListener('scroll', handleScroll);
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
      loadTestoHome()
    });

    return {
      seminari,
      isSticky,
      handleScroll,
      content,
      testoHome,
      paragraphs: Array(30).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut lectus euismod, vehicula quam eu, egestas ante.')
    };
  }
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.sticky-image {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
}

.sticky-image.sticky {
  position: sticky;
}

.content {
  overflow-y: scroll;
  padding-top: 20px;
}

.content p {
  margin: 20px 0;
}
</style>