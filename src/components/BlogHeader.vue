<template>
  <header class="header">
    <div class="hdiv">
      <div class="navigations">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" class="logo"/>
        </router-link>
        <nav class="tabs">
          <router-link to="/blog/main" class="tab">Home</router-link>
          <router-link to="/blog/new" class="tab">New</router-link>
          <router-link to="/blog/popular" class="tab">Popular</router-link>
          <router-link to="/blog/subscribes" class="tab">Subscribes</router-link>
          <router-link to="/blog/search" class="tab">Search</router-link>
        </nav>
      </div>
      <div class="account">
        <div v-if="notifications > 0" class="notification"></div>
        <div v-if="!username">
          <router-link to="/signin">
            <button id="btn_account" class="btn btn-outline-light">Sign In</button>
          </router-link>
          <router-link to="/signup">
            <button id="btn_account" class="btn btn-outline-light">Sign Up</button>
          </router-link>
        </div>
        <div v-else>
          <b-dropdown id="dropdown" right :text="username" variant="outline-light" class="m-2">
            <b-dropdown-item :to="'/user/' + username">Profile</b-dropdown-item>
            <b-dropdown-item :to="'/user/' + username + '/post/all'">My blogs</b-dropdown-item>
            <b-dropdown-item @click="signout">Sign out</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import config from '@/assets/config.json';

export default {
  data() {
    return {
      username: null,
      token: null,
      userVerified: false,
      repeatVerificateRequest: false,
      notifications: 0,
    };
  },
  mounted() {
    this.username = localStorage.getItem('username');
    this.token = localStorage.getItem('token');
    this.userVerified = !localStorage.getItem('verified') || false;
    this.repeatVerificateRequest = localStorage.getItem('repeatVerificateRequired') || false;
    if (!this.userVerified || this.repeatVerificateRequest) {
      this.notifications += 1;
    }
  },
  methods: {
    signout() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('repeatVerificateRequired');
      localStorage.removeItem('verified');
      this.username = null;
      this.token = null;
      this.notifications = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';

  header {
    height: 65px;
    width: 100%!important;
    background: $main;
  }

  .hdiv {
    display: flex;
    justify-content: space-between;
    .navigations {
      display: flex;
      justify-content: left;
      align-items: center;
      height: 65px;
    }
    .account {
      display: flex;
      justify-content: right;
      align-items: center;
      height: 65px;
      margin-right: 5px;
      .notification {
        height: 10px;
        width: 10px;
        background: $white;
        border-radius: 10px;
        margin-right: 5px;
      }
      #btn_account {
        margin: 8px;
      }
    }
  }

  .logo {
    height: 50px;
    width: 50px;
    margin-left: 10px;
  }

  .tabs{
    margin-left: 20px;
    .tab {
      color: $white;
      text-decoration: none;
      margin: 15px;
    }
    .tab:hover {
      color: $link_hover;
    }
    .router-link-active {
      font-weight: bolder;
      color: $link_active;
    }
  }
</style>
