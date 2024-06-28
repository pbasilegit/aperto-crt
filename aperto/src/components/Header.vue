<template>
      <nav>
        <router-link to="/" >
          <img src="../../public/header_aperto.svg" alt="Sticky Image" :class="{ 'scale-100': isScale100, 'scale-80':!isScale100 }">
        </router-link> 
        <router-link to="/about">About</router-link>  
      </nav>
  </template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const lastScrollTop = ref(0);
const isScale100 = ref(true); // Scala 100% quando lo scroll è verso l'alto


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollTop = window.scrollY 
  console.log(scrollY)
  if (scrollTop ==0) {
    // Scroll verso il basso
    isScale100.value = true;
  } else {
    // Scroll verso l'alto
    isScale100.value = false;
  }
  lastScrollTop.value = scrollTop; // Aggiorna la posizione dello scroll precedente
}
  </script>



