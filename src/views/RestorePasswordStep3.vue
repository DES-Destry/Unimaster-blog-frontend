<template>
  <div class="main">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png" @click="clear"/>
      </router-link>
      <h2>Let's restore your password!</h2>
      Don't forget password next time ;) Check your CapsLock and language layout on your keyboard.
      <br/>
      Password must be longer than 8 symbols!
      <div class="inputs">
        <div class="form-group">
          <label for="password">New password</label>
          <input type="password" class="form-control" id="password" v-model="password" @change="typePassword">
        </div>
        <div class="form-group">
          <label for="repeat-password">Repeat password</label>
          <input type="password" class="form-control" id="repeat-password" v-model="repeatPassword" @change="typePassword">
        </div>
      </div>
      <ProgressBar :progress="progress"/>
      <div class="buttons">
        <button class="btn btn-danger" @click="cancel">Cancel</button>
        <button class="btn btn-success" @click="next" :disabled="!passwordAvailable">Restore password!</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { backendUrl } from '@/assets/config.json';
import ProgressBar from '@/components/StepProgress.vue';

export default {
  data() {
    return {
      password: '',
      repeatPassword: '',
      passwordAvailable: false,
      errorText: '',
      progress: {
        currentStep: 3,
        steps: this.$store.state.restoreSteps,
      },
    };
  },
  components: { ProgressBar },
  methods: {
    next() {
      const data = {
        login: this.$store.state.restorePassword.step1.login,
        code: this.code,
      };
      axios.put(`${backendUrl}/api/user/password/restore`, data)
        .then((response) => {
          if (response.status === 200) {
            this.$store.state.restorePassword = null;
            this.$router.push('/signin');
            return;
          }

          this.errorText = 'All good, but something went wrong...';
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.errorText = 'Access denied. Login or code are wrong. I don\'t know how ¯\\_(ツ)_/¯';
            this.code = '';
            return;
          }
          if (err.response.status === 500) {
            this.errorText = 'Internal server error :( Try again later.';
            this.code = '';
            return;
          }

          this.errorText = 'Some unknown error has been occured';
        });
    },
    cancel() {
      this.$store.state.restorePassword = null;
      this.$router.push('/signin');
    },
    clear() {
      this.$store.state.restorePassword = null;
    },
    typePassword() {
      this.passwordAvailable = this.password.length >= 8 && this.password === this.repeatPassword;
    },
  },
  mounted() {
    if (!this.$store.state.restorePassword) {
      this.$router.push('/signin');
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';
  @import '../assets/styles/base_btn.scss';
  @import '../assets/styles/restore_password.scss';
</style>
