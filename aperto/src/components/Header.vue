<template>
      <nav id="myNav" >
        <router-link to="/demo" >
          <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/header_aperto.svg" alt="Sticky Image" :class="{ 'scale-100': isScale100, 'scale-80':!isScale100 }">
        </router-link> 
        <router-link to="/about" class="nav-links--about" exact-active-class="active-link">About</router-link>  
      </nav>
</template>
  
<script setup>
import { ref, onUnmounted, onMounted } from 'vue';

const lastScrollTop = ref(0);
const isScale100 = ref(true); // Scala 100% quando lo scroll è verso l'alto


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

function updateMarginTop() {
      const navElement = document.getElementById('myNav');
      const navHeight = navElement.getBoundingClientRect().height;
      const herocontentDesktop = document.getElementById('hero-content--desktop')
      if(herocontentDesktop){
        /**DESKTOP */
        console.log('Altezza della nav:', navHeight, 'px');
        const stickyimage = document.getElementById('logo_01');
        herocontentDesktop.style.marginTop = `${navHeight + 20}px`;
        stickyimage.style.top = `${navHeight +3}px`;
        console.log('Altezza top:', stickyimage, 'px');

        /**MOBILE */
        const stickyimageMobile = document.getElementById('logo_01_mobile');
        const herocontentMobile = document.getElementById('hero-content--mobile')
        stickyimageMobile.style.top = `${navHeight -2 }px`;
        herocontentMobile.style.marginTop = `${navHeight + 20}px`;
      }
    
    }

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollTop = window.scrollY 
  if (scrollTop ==0) {
    // Scroll verso il basso
    isScale100.value = true;
    updateMarginTop()
  } else {
    // Scroll verso l'alto
    isScale100.value = false;
  }
  lastScrollTop.value = scrollTop; // Aggiorna la posizione dello scroll precedente
}
  </script>



