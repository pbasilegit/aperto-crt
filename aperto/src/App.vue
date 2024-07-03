<template>





  <div id="app">
    
    <Header/>

    
    <router-view @componentReady="onComponentReady"></router-view>

    <Footer  v-if="isComponentReady"/>

  </div>
</template>



<style>
/* Aggiungi stili per il tuo componente principale */
</style>


<script>
import Home from './views/Home.vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import {onMounted , ref} from 'vue';


export default {
  name: 'App',
  components: {
    Home,
    Header,
    Footer
  },
  setup() {
    const isComponentReady = ref(false);

    const onComponentReady = (event) =>{
      isComponentReady.value = event;
      console.log('caricamento...')
  
      console.log('prima...', isComponentReady.value)
     
      
      console.log('poi...', isComponentReady.value)
    }

    onMounted(() => {
    isComponentReady.value = false;
    // Fa scorrere la pagina all'inizio prima di montare il componente
    window.scrollTo(0, 0);
  })
  return{
    isComponentReady,
    onComponentReady
  }
}
  
  
 
}

</script>


