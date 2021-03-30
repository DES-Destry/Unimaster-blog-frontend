<template>
  <div class="main">
    <div class="container">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png"/>
      </router-link>
      <h3 class="title">Create blog account</h3>
      <div class="signup">
        <div class="form-group">
          <label for="username" required>Username</label>
          <input type="text" class="form-control" id="username" @change="typeUsername" v-model="username">
          <div class="not-valid">{{usernameNotValidText}}</div>
        </div>
        <div class="form-group" required>
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" @change="typeEmail" v-model="email">
          <div class="not-valid">{{emailNotValidText}}</div>
        </div>
        <div class="form-group" required>
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" @change="typePassword" v-model="password">
          <small class="form-text">Password must be not less than 8 symbols.</small>
          <small class="form-text"> For more secure use longer password, numbers, special symbols</small>
        </div>
        <div class="form-group" required>
          <label for="repeatPassword">Please, repeat the password</label>
          <input type="password" class="form-control" id="repeatPassword" @change="typePassword" v-model="repeatPassword">
          <div class="not-valid">{{passwordNotValidText}}</div>
        </div>
        <button class="btn btn-outline-light" @click="createAccount" :disabled="!validCreate">Create account</button>
        <div v-if="createdNotSuccessful" class="not-valid">User creation error! Error code: {{errorStatusCode}}</div>
      </div>
    </div>
    <div class="signin">
      <label class="signinitem">Aready have an account?</label>
      <router-link class="signinroute signinitem" to="/signin">Sign In!</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { backendUrl } from '@/assets/config.json';

export default {
  data() {
    return {
      username: '',
      validUsername: false,
      usernameNotValidText: '',
      email: '',
      validEmail: false,
      emailNotValidText: '',
      password: '',
      repeatPassword: '',
      validPassword: false,
      passwordNotValidText: '',
      errorStatusCode: 101,
      createdNotSuccessful: false,
      rules: false,
    };
  },
  methods: {
    createAccount() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      axios.post(`${backendUrl}/api/auth/registrate`, userData)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem('token', response.data.content.token);
            localStorage.setItem('username', response.data.content.username);
            localStorage.setItem('verified', false);

            if (response.status === 200) {
              localStorage.setItem('repeatVerificateRequired', false);
              this.$router.push('/blog/main');
            } else if (response.status === 201) {
              localStorage.setItem('repeatVerificateRequired', true);
              this.$router.push(`/user/${response.data.content.username}`);
            }
          }
        })
        .catch((err) => {
          this.username = '';
          this.email = '';
          this.password = '';
          this.repeatPassword = '';
          this.createdNotSuccessful = true;
          this.typeUsername();
          this.typeEmail();
          this.typePassword();
          this.errorStatusCode = err.response?.status || 'unknown error';
        });
    },
    typeUsername() {
      let serverValidated = true;
      if (this.username.trim() === '') {
        this.validUsername = false;
        this.usernameNotValidText = 'Username must be not empty!';
        return;
      }

      axios.get(`${backendUrl}/api/user/exists?login=${this.username}`)
        .then((response) => {
          if (response.status === 200) {
            this.validUsername = false;
            this.usernameNotValidText = 'User with this username already exists!';
            serverValidated = false;
          }
        })
        .catch((err) => {
          if (err.response?.status === 500) {
            this.validUsername = false;
            this.usernameNotValidText = 'Internal server error. Try create account later...';
            serverValidated = false;
          }
        });

      if (!serverValidated) return;

      this.usernameNotValidText = '';
      this.validUsername = true;
    },
    typeEmail() {
      let serverValidated = true;
      if (this.email.trim() === '') {
        this.validEmail = false;
        this.emailNotValidText = 'Email must be not empty!';
        return;
      }

      axios.get(`${backendUrl}/api/user/exists?login=${this.email}`)
        .then((response) => {
          if (response.status === 200) {
            this.validEmail = false;
            this.emailNotValidText = 'User with this email already exists!';
            serverValidated = false;
          }
        })
        .catch((err) => {
          if (err.response?.status === 500) {
            this.validEmail = false;
            this.emailNotValidText = 'Internal server error. Try create account later...';
            serverValidated = false;
          }
        });

      if (!serverValidated) return;

      this.emailNotValidText = '';
      this.validEmail = true;
    },
    typePassword() {
      if (this.password.length < 8) {
        this.validPassword = false;
        this.passwordNotValidText = 'Password must be not less than 8 symbols!';
        return;
      }

      if (this.password !== this.repeatPassword) {
        this.validPassword = false;
        this.passwordNotValidText = 'Password and repeated password must be the same!';
        return;
      }

      this.passwordNotValidText = '';
      this.validPassword = true;
    },
  },
  computed: {
    validCreate() {
      return this.validUsername && this.validEmail && this.validPassword;
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

  .signup {
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
      color: $white;
    }
    small {
      color: $muted;
    }
    .input-group {
      width: 27rem;
    }
    .not-valid {
      display: flex;
      justify-content: left;
      align-items: stretch;
      font-size: 15px;
      color: $wrong_input;
    }
  }

  .signin {
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
    .signinroute {
      margin-left: 6px;
    }
    .signinitem, label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
