<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fill-height>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue'
export default {
  name: 'layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
// insert styles here
</style>