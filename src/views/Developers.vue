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

<style scoped>
  .header {
    border: #FFFFFF solid 1px;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    position: sticky;
    top: 0px;
    z-index: 999;
  }

  .devs {
    margin-top: 20px;
  }
</style>
