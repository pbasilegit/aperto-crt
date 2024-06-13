<template>
  <div id="app">
    <nav>
      <router-link to="/">NAVIGAZIONE</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>

    <router-view>
    </router-view>

    <footer>FOOTER</footer>

  </div>
</template>



<style>
/* Aggiungi stili per il tuo componente principale */
</style>


<script>
export default {
  name: 'App',
};
</script>


