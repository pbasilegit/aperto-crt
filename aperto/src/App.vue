<template>
  <div id="app">
  
    <Header/>
      <!--<router-link to="/">NAVIGAZIONE</router-link> -->
      <!-- <router-link to="/about">About</router-link> -->
    
    <router-view>
    </router-view>

    <Footer/>

  </div>
</template>



<style>
/* Aggiungi stili per il tuo componente principale */
</style>


<script>
import Home from './views/Home.vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Home,
    Header,
    Footer
  },
  computed: { showHeader() { return this.$route.name !== 'Home'; } },
  beforeMount() {
    // Fa scorrere la pagina all'inizio prima di montare il componente
    window.scrollTo(0, 0);
  }
};
</script>


