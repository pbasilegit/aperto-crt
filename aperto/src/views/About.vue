<template>

  <section id="intro">
    <p v-if="testoAbout" v-html="testoAbout.content.rendered"></p>
  </section>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, inject } from 'vue';


export default {
  name: 'About',
  setup() {
    const testoAbout = ref(null);
    const axios = inject('axios');

    const fetchAboutText = async () => {
      try {
        const response = await axios.get('/wp/v2/pages/103');
        testoAbout.value = response.data;
      } catch (error) {
        console.error('Errore nel recuperare i seminari:', error);
      }
    };

    onMounted(() => {
      fetchAboutText();
    });
    return {
      testoAbout
    }
  }
}
</script>