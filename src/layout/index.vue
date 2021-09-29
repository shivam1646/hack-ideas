<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
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