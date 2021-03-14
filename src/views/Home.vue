<template>
  <div class="home">
    <div class="container">
      <img class="logo" src="@/assets/logo.png"/>
      <h1 class="title">Unimaster Blog</h1>
      <div class="routes">
        <div class="devs crd">
          <img class="slot_img" src="@/assets/images/dev_main.png"/>
          <router-link to="/developers">
            <button id="route" class="btn btn-outline-light">Blog developers</button>
          </router-link>
        </div>
        <div class="blog crd">
          <img class="slot_img" src="@/assets/images/blog_main.png"/>
          <router-link to="/blog/main">
            <button id="route" class="btn btn-outline-light">Join to blog!</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';

  .home {
    height: 100vh;
    background: $main;
  }

  .title {
    font-size: 75px;
    color: $white;
  }

  .logo {
    width: 400px;
    height: 400px;
    margin-top: 50px;
  }

  .routes {
    margin-top: 70px;
    display: flex;
    justify-content: center;
  }

  .crd {
    display: flex;
    flex-direction: column;
    align-items: center;
    .slot_img {
      width: 104px;
    }
  }

  .devs {
    border-right: $white solid 1px;
  }

  .blog {
    border-left: $white solid 1px;
  }

  #route {
    width: 200px;
    margin: 20px;
  }
</style>
