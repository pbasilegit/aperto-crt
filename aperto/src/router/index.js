import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Seminario from '../views/Seminario.vue';
import Faq from '../views/faq.vue';
import Faculty from '../views/Faculty.vue';
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
    path: '/faculty',
    name: 'Faculty',
    component: Faculty
  }
];

const router = createRouter({
   history: createWebHistory('/'),
  routes
});

export default router;
