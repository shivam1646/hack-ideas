<template>
  <v-app-bar
    app
    absolute
    color="white"
    class="app-bar"
  >
    <v-icon class="pa-3" large>mdi-lightbulb-on-outline</v-icon>
    <v-app-bar-title v-text="TITLE" class="title" />
    <v-spacer />
    <div v-if="loggedInUser">
      <span
        v-text="`Hello, ${loggedInUser.name}`"
        class="mr-6 user-text primary-text hidden-sm-and-down"
      />
      <router-link :to="{ path: 'idea/add' }">
        <v-icon large>mdi-plus-thick</v-icon>
      </router-link>
      <v-icon
        class="mx-3"
        large
        @click="onLogout()"
      >
        mdi-logout-variant
      </v-icon>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const TITLE = 'HACK IDEAS';

export default {
  name: 'app-header',

  created() {
    this.TITLE = TITLE;
  },

  computed: {
    ...mapState(['loggedInUser'])
  },

  methods: {
    ...mapActions(['logout']),

    onLogout() {
      try {
        this.logout();
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log('storage error');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-text {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
