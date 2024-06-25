<template>
  <div id="app">
  
    <Header v-if="showHeader"/>
      <!--<router-link to="/">NAVIGAZIONE</router-link> -->
      <!-- <router-link to="/about">About</router-link> -->

    <router-view>
    </router-view>

    <footer>FOOTER</footer>

  </div>
</template>



<style>
/* Aggiungi stili per il tuo componente principale */
</style>


<script>
import Home from './views/Home.vue';
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Home,
    Header
  },
  computed: { showHeader() { return this.$route.name !== 'Home'; } }
};
</script>


