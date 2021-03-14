<template>
  <div>
    <NonBlogHeader class="header"/>
    <div class="container">
        <div class="devs">
          <h1>Blog Developers</h1>
          <DevelopersList v-bind:devs="devs"/>
        </div>
    </div>
  </div>
</template>

<script>
import NonBlogHeader from '@/components/NonBlogHeader.vue';
import DevelopersList from '@/components/DevelopersList.vue';
import devs from '@/assets/developers.json';

export default {
  data() {
    return {
      devs,
    };
  },
  components: {
    NonBlogHeader,
    DevelopersList,
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/header.scss';

  .devs {
    margin-top: 20px;
  }
</style>
