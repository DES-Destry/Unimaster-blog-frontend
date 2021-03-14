<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Inter");

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
