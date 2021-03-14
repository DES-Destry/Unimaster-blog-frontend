<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/developer/destry">Developers</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: Inter;
  src: url('./fonts/Inter/Inter-Regular.ttf');
}

#app {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
