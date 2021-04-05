import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  //   restorePassword: {
  //     step1: {
  //       login: null,
  //     },
  //     step2: {
  //       code: null,
  //     },
  //   },
    restorePassword: null,
    restoreSteps: [
      {
        name: 'Type your login',
      },
      {
        name: 'Type code from email',
      },
      {
        name: 'Change your password',
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
