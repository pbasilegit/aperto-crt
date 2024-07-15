import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Seminario from '../views/Seminario.vue';
import Faq from '../views/faq.vue';
import Faculty from '../views/Faculty.vue';
import Partecipanti from '../views/Partecipanti.vue';
import ListingSeminari from '../views/ListingSeminari.vue';
import FacultyId from '../views/FacultyId.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/seminario/:id',
    name: 'Seminario',
    component: Seminario
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: Faq
  },
  {
    path: '/faculty/:id',
    name: 'FacultyId',
    component: FacultyId
  },
  {
    path: '/faculty',
    name: 'Faculty',
    component: Faculty
  },
  {
    path: '/partecipanti',
    name: 'Partecipanti',
    component: Partecipanti
  }
  ,
  {
    path: '/seminari',
    name: 'Listingseminari',
    component: ListingSeminari
  }
];

const router = createRouter({
   history: createWebHistory('/'),
  routes
});

export default router;
