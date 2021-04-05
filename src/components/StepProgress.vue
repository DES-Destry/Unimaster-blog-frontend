<template>
  <div v-if="validProgressProp" class="main">
    <div class="chain">
      <div class="point completed chain-element"></div>
      <div class="chain-element" v-for="(step, index) of stepsToRender" :key="index">
        <div :class="completedStatus(index) + ' stick'"></div>
        <div :class="completedStatus(index) + ' point'"></div>
      </div>
    </div>
    <div class="name">{{currentStepName}}</div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      currentStep: {
        type: Number,
        required: true,
      },
      steps: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  computed: {
    validProgressProp() {
      if (this.progress.steps.length === 0) {
        return false;
      }

      return true;
    },

    stepsToRender() {
      return this.progress.steps.filter((element, index) => index !== 0);
    },

    currentStepName() {
      return this.progress.steps[this.progress.currentStep - 1].name;
    },
  },
  methods: {
    completedStatus(index) {
      if (index <= this.progress.currentStep - 2) {
        return 'completed'; // css class name
      }

      return 'inprogress'; // css class name
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors.scss';

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chain {
    display: flex;
    flex-direction: row;
    align-items: center;
    .chain-element {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .point {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    z-index: 2;
  }

  .stick {
    margin: -1px;
    width: 14vw;
    height: 5px;
    z-index: 1;
  }

  .completed {
    background: $completed;
  }

  .inprogress {
    background: $link_hover;
  }

  .name {
    margin-top: 5px;
  }
</style>
