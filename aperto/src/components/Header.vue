<template>
      <nav id="myNav" >
        <router-link to="/" >
          <img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/header_aperto.svg" alt="Sticky Image" :class="{ 'scale-100': isScale100, 'scale-80':!isScale100 }">
        </router-link> 
        <div @click="toggleMenu" class="menu-button">
          Menu
        </div>
        <div class="dropdown-content" v-show="showMenu">
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/seminari">Seminari</router-link></li>
            <li><router-link to="/partecipanti">Partecipanti</router-link></li>
            <li><router-link to="/faculty">Faculty</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
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



<style scoped>
.menu-button {
  cursor: pointer;
  /* Stili personalizzati per il pulsante del menu */
}

.dropdown-content {
  position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: fit-content;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: right; 
}

.dropdown-content ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown-content li {
  padding: 12px 16px;
  cursor: pointer;
}

.dropdown-content li:hover {
  background-color: #f1f1f1;
}
</style>