<template>
  <div>
    <BlogHeader/>
    <div class="container">
      <h1>Popular blogs</h1>
    </div>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';

export default {
  components: {
    BlogHeader,
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/header.scss';
</style>
