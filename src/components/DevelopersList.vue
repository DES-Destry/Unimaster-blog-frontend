<template>
<div class="container">
    <b-container>
      <b-row align-v="center" align-h="center">
        <DeveloperBlock v-for="dev in devs" :key="dev" :dev="dev"/>
      </b-row>
    </b-container>
</div>
</template>

<script>
import DeveloperBlock from '@/components/DeveloperBlock.vue';

export default {
  props: {
    devs: {
      type: Array,
    },
  },
  components: {
    DeveloperBlock,
  },
};
</script>
