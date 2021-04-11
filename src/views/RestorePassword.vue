<template>
  <div class="main">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png"/>
      </router-link>
      <h2>Let's restore your password!</h2>
      <div class="form-group">
        <label for="login">Login (username or email)</label>
        <input type="text" class="form-control" id="login" v-model="login" @change="typeLogin">
      </div>
      <ProgressBar :progress="progress"/>
      <div class="buttons">
        <button class="btn btn-danger" @click="cancel">Cancel</button>
        <button class="btn btn-success" @click="next" :disabled="!nextAvailable">Next -></button>
      </div>
      <div class="error">{{errorText}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { backendUrl } from '@/assets/config.json';
import ProgressBar from '@/components/StepProgress.vue';

export default {
  data() {
    return {
      login: '',
      nextAvailable: false,
      errorText: '',
      progress: {
        currentStep: 1,
        steps: this.$store.state.restoreSteps,
      },
    };
  },
  components: { ProgressBar },
  methods: {
    next() {
      const data = {
        login: this.login,
      };
      axios.post(`${backendUrl}/api/user/password/restore/codeRequest`, data)
        .then((response) => {
          if (response.status === 200) {
            this.$store.state.restorePassword = null;
            this.$store.state.restorePassword = {
              step1: {
                login: this.login,
              },
            };
            this.$router.push('/restore-password/step2');
            return;
          }

          this.errorText = 'All good, but something went wrong...';
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.errorText = 'User with this login not found!';
            this.errorOccured();
            return;
          }
          if (err.response.status === 500) {
            this.errorText = 'Internal server error :( Try again later.';
            this.errorOccured();
            return;
          }

          this.errorText = 'Some unknown error has been occured';
        });
    },
    cancel() {
      this.$store.state.restorePassword = null;
      this.$router.push('/signin');
    },
    typeLogin() {
      this.nextAvailable = this.login.trim() !== '';
    },
    errorOccured() {
      this.login = '';
      this.typeLogin();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';
  @import '../assets/styles/base_btn.scss';
  @import '../assets/styles/restore_password.scss';
</style>
