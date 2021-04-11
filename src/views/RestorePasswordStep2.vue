<template>
  <div class="main">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png" @click="clear"/>
      </router-link>
      <h2>Let's restore your password!</h2>
      <div class="form-group">
        <label for="code">Verification code (get it from your email)</label>
        <input type="text" class="form-control" id="code" v-model="code" @change="typeCode">
      </div>
      <ProgressBar :progress="progress"/>
      <div class="buttons">
        <button class="btn btn-danger" @click="cancel">Cancel</button>
        <button class="btn btn-success" @click="next" :disabled="!codeAvailable">Next -></button>
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
      code: '',
      codeAvailable: false,
      errorText: '',
      progress: {
        currentStep: 2,
        steps: this.$store.state.restoreSteps,
      },
    };
  },
  components: { ProgressBar },
  methods: {
    next() {
      if (!this.codeAvailable) return;

      const data = {
        login: this.$store.state.restorePassword.step1.login,
        code: this.code,
      };
      axios.get(`${backendUrl}/api/user/password/restore/check?login=${data.login}&code=${data.code}`)
        .then((response) => {
          if (response.status === 200) {
            this.$store.state.restorePassword.step2 = {
              code: this.code,
            };
            this.$router.push('/restore-password/step3');
            return;
          }

          this.errorText = 'All good, but something went wrong...';
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.errorText = 'This code not available for this user!';
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
    clear() {
      this.$store.state.restorePassword = null;
    },
    typeCode() {
      this.codeAvailable = this.code.length === 6;
    },
    errorOccured() {
      this.code = '';
      this.typeCode();
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
