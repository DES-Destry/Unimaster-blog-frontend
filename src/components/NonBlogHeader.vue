<template>
  <header>
    <div class="hdiv">
      <router-link to="/" class="main">
        <p>Unimaster Blog</p>
      </router-link>

      <div class="source_code">
        <p>Source code:</p>
        <a id="backend" class="src_butt" href="https://github.com/DES-Destry/Unimaster-blog-core">
          <button type="button" class="btn btn-outline-light">Backend</button>
        </a>
        <a id="frontend" class="src_butt" href="https://github.com/DES-Destry/Unimaster-blog-frontend">
          <button type="button" class="btn btn-outline-light">Frontend</button>
        </a>
      </div>

      <div class="to_blog">
        <router-link to="/blog/main">
          <button type="button" class="btn btn-outline-light">Join to blog!</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';

  header {
    height: 65px;
    width: 100%!important;
    background: $main;
  }

  .hdiv {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .main {
    text-decoration: none;
    color: $white;
    font-size: 27px;
    margin-top: 10px;
  }

  .source_code {
    display: flex;
    align-items: baseline;
    color: $white;
    font-size: 17px;
  }

  .src_butt {
    margin: 7px;
  }
</style>
