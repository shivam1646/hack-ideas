<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
    class="my-3 card-preview"
  >
    <!-- image -->
    <v-col
      :cols="isMdAndUp() ? 2 : 4"
      class="text-center"
    >
      <v-avatar
        class="ma-3"
        :size="isMdAndUp() ? 125 : 75"
        tile
      >
        <v-img src="../assets/idea-default.png"></v-img>
      </v-avatar>
    </v-col>
    <v-divider vertical class="my-3" />
    <!-- title and description -->
    <v-col
      :cols="isMdAndUp() ? 6 : 8"
      class="text-left pl-2"
    >
      <h3 v-text="idea.title" />
      <span class="description" v-text="idea.description" />
    </v-col>
    <v-divider v-if="isMdAndUp()" vertical class="my-3" />
    <v-col v-if="isMdAndUp()" :cols="4">
      <!-- meta section -->
      <idea-meta :createdAt="idea.createdAt" :tags="idea.tags" />
    </v-col>
    <v-divider class="mx-3" />
    <!-- upvotes section -->
    <v-col cols="12">
      <manage-upvotes :ideaId="idea.id" />
    </v-col>
  </v-row>
</template>

<script>
import ManageUpvotes from './manage-upvotes.vue';
import IdeaMeta from './idea-meta.vue';

export default {
  name: 'idea-preview',

  components: { ManageUpvotes, IdeaMeta },

  props: {
    idea: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  }
}

</script>

<style lang="scss" scoped>
.card-preview {
  border: 1px solid lightgrey;
  border-radius: 10px;
}

.description {
  color: $secondary-text-color;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
