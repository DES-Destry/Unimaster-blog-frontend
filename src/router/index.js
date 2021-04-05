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
    path: '/signin',
    name: 'Sign In',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/restore-password/step1',
    name: 'Restore password(step 1)',
    component: () => import('@/views/RestorePassword.vue'),
  },
  {
    path: '/restore-password/step2',
    name: 'Restore password(step 2)',
    component: () => import('@/views/RestorePasswordStep2.vue'),
  },
  {
    path: '/restore-password/step3',
    name: 'Restore password(step 3)',
    component: () => import('@/views/RestorePasswordStep3.vue'),
  },
  {
    path: '/blog/main',
    name: 'Main Blog',
    component: () => import('@/views/MainBlogPage.vue'),
  },
  {
    path: '/blog/new',
    name: 'New blogs',
    component: () => import('@/views/NewBlogPage.vue'),
  },
  {
    path: '/blog/popular',
    name: 'Popular blogs',
    component: () => import('@/views/PopularBlogPage.vue'),
  },
  {
    path: '/blog/subscribes',
    name: 'Subscribes',
    component: () => import('@/views/SubscribesBlogPage.vue'),
  },
  {
    path: '/blog/search',
    name: 'Search',
    component: () => import('@/views/SearchBlogPage.vue'),
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
