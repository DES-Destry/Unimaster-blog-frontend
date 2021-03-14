import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () => import('@/views/Developers.vue'),
  },
  {
    path: '/developer/:name',
    name: 'Developer',
    component: () => import('@/views/Developer.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
