<template>
      <nav id="myNav" >
        <router-link to="/" >
          <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/header_aperto.svg" alt="Sticky Image" :class="{ 'scale-100': isScale100, 'scale-80':!isScale100 }">
        </router-link> 

        <!-- menu mobile -->
        <div @click="toggleMenu" class="menu-button">
          Menu
        </div>
        <div class="dropdown-content" v-show="showMenu">
          <ul>
            <li><router-link @click="toggleMenu" to="/about">About</router-link></li>
            <li><router-link to="/seminari">Seminari</router-link></li>
            <li><router-link to="/partecipanti">Partecipanti</router-link></li>
            <li><router-link to="/faculty">Faculty</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
          </ul>
        </div>
        
         <!-- menu desktop -->
         <div class="desktop-menu">
          <ul>
            <li><router-link to="/about" active-class="active-link">About</router-link></li>
            <li><router-link to="/seminari" active-class="active-link">Seminari</router-link></li>
            <li><router-link to="/partecipanti" active-class="active-link">Partecipanti</router-link></li>
            <li><router-link to="/faculty" active-class="active-link">Faculty</router-link></li>
            <li><router-link to="/faq" active-class="active-link">FAQ</router-link></li>

          </ul>
        </div>

      </nav>
</template>
  
<script setup>
import { ref, onUnmounted, onMounted } from 'vue';

const lastScrollTop = ref(0);
const showMenu = ref(false);
const isScale100 = ref(true); // Scala 100% quando lo scroll è verso l'alto

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

})


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollTop = window.scrollY 
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
