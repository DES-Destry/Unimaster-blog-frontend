<template>
  <div class="main">
    <div class="container">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png"/>
      </router-link>
      <h3 class="title">Sign In to blog</h3>
      <div class="signin">
        <div class="form-group">
          <label for="login">Login (username or email)</label>
          <input type="text" class="form-control" id="login" v-model="login">
        </div>
        <label for="password">Password</label>
        <div class="input-group mb-3">
          <input type="password" id="password" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="password">
          <div class="input-group-append">
            <router-link to="/restore-password/step1">
              <button class="btn btn-outline-light" type="button">Forgot password?</button>
            </router-link>
          </div>
        </div>
        <button class="btn btn-outline-light" @click="signIn">Sign in</button>
        <div class="error">{{errorText}}</div>
      </div>
    </div>
    <div class="signup">
      <label class="signupitem">Still don't have an account?</label>
      <router-link class="signuproute signupitem" to="/signup">Create new account!</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { backendUrl } from '@/assets/config.json';

export default {
  data() {
    return {
      login: '',
      password: '',
      errorText: '',
    };
  },
  methods: {
    signIn() {
      const userData = {
        login: this.login,
        password: this.password,
      };

      axios.post(`${backendUrl}/api/auth/login`, userData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.content.token);
            localStorage.setItem('username', response.data.content.username);
            localStorage.setItem('verified', response.data.content.verified);
            this.$router.push('/blog/main');
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.errorText = 'Login or password not correct!';
          } else if (err.response.status === 500) {
            this.errorText = 'Internal server error! Try again later...';
          } else {
            this.errorText = 'Unknown error...';
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';

  .main {
    height: 100vh;
    background: $main;
  }

  .logo {
    width: 50;
    height: 50px;
    margin-top: 30px;
  }

  .title {
    margin-top: 20px;
    color: $white;
  }

  .signin {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: $white solid 2px;
    border-radius: 10px;
    padding: 30px;
    margin-right: 50px;
    margin-left: 50px;
    label {
      display: flex;
      justify-content: left;
      align-items: stretch;
      width: 27rem;
      color: $white
    }
    .input-group {
      width: 27rem;
    }
    .error {
      color: $wrong_input;
    }
  }

  .signup {
    margin: 50px;
    border: $white solid 2px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      margin: 5px;
      color: $white;
    }
    .signuproute {
      margin-left: 6px;
    }
    .signupitem, label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
