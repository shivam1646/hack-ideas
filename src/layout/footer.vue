<template>
  <v-footer color="brandSecondary white--text">
    <v-col
      class="text-center"
    >
      © {{ new Date().getFullYear() }} — <strong>Hack Ideas</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>