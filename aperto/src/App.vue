<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
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

<style lang="scss">
#app {
  h1 {
    color: $primary-color; // Usa la variabile definita in _variables.scss
  }
  .centered-box {
    @include flex-center; // Usa il mixin definito in _mixins.scss
    width: 200px;
    height: 200px;
    background-color: $secondary-color;
  }
}
</style>
