<template>
  <b-col>
    <b-card
      :title="dev.name"
      :img-src=devAvatarPath
      img-alt="dev_avatar"
      img-top
      tag="article"
      class="info_card"
    >
      <b-card-text>
        {{dev.role}}
      </b-card-text>

      <b-button :href="'/developer/' + dev.route" class="btn btn-warning">Show -></b-button>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: {
    dev: {
      type: Object,
    },
  },
  computed: {
    devAvatarPath() {
      // eslint-disable-next-line
      return require(`../assets/devImages/${this.dev?.route || 'not_found'}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base_btn.scss';

  .info_card {
    width: 15rem;
    height: 27rem;
    margin: 10px;
  }
</style>
