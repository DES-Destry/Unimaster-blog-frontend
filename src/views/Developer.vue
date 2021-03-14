<template>
  <div>
    <NonBlogHeader class="header"/>
    <div class="container">
      <div>
        <div id="info" class="row">
          <div class="col">
            <img id="dev_img"
            class="rounded-circle"
            :src=devAvatarPath
            alt="avatar">
          </div>
          <div class="col-9">
            <div class="row">
              <h3>{{devInfo.name}}</h3>
            </div>
            <div class="row">
              {{devInfo.role}}
            </div>
          </div>
        </div>
        <hr/>
        <div class="description">
          {{devInfo.description}}
        </div>
        <div class="contacts">
          <h1 v-if="Array.isArray(devInfo.links)">Contacts</h1>
          <b-button-group>
            <a v-for="link in devInfo.links" :key="link.type" :href="link.link">
              <b-button id="contact" type="button" class="btn btn-warning">
                <!--<b-icon :icon="link.type.toLowerCase()"></b-icon>-->{{link.type}}
              </b-button>
            </a>
          </b-button-group>
        </div>
        <div class="other_devs">
          <h1>Other Developers</h1>
          <DevelopersList v-bind:devs="devs"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NonBlogHeader from '@/components/NonBlogHeader.vue';
import DevelopersList from '@/components/DevelopersList.vue';
import devs from '@/assets/developers.json';
import unknownDev from '@/assets/not_found.json';

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
  computed: {
    devInfo() {
      const dev = this.devs.filter((developer) => developer.route === this.$route.params.name);
      if (dev.length === 0) {
        return unknownDev;
      }
      return dev[0];
    },
    devAvatarPath() {
      const dev = this.devs.filter((developer) => developer.route === this.$route.params.name);

      if (dev.length === 0) {
        // eslint-disable-next-line
        return require('../assets/devImages/not_found.png');
      }
      // eslint-disable-next-line
      return require(`../assets/devImages/${dev[0]?.route || 'not_found'}.png`);
    },
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

  #info {
    margin-top: 20px;
  }

  #dev_img {
    height: 175px;
    width: 175px;
  }

  .contacts, .other_devs {
    margin-top: 50px;
  }

  #contact {
    margin: 5px;
  }

  .btn-warning, .btn-warning:active, .btn-warning:visited {
    background-color: #DC821E !important;
    color: #FFFFFF !important;
  }

  .btn-warning:hover {
    background-color: #FFC107 !important;
    color: #000000 !important;
  }
</style>
