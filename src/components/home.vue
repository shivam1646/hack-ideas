<template>
  <div class="wrapper">
    <toolbar />
    <idea-preview
      v-for="idea in sortedIdeas"
      :idea="idea"
      :key="idea.id"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import IdeaPreview from './idea-preview.vue';
import Toolbar from './toolbar.vue';
import { sortBy } from '../../utils';

export default {
  name: 'home',

  components: { IdeaPreview, Toolbar },

  created() {
    this.getIdeas();
  },

  computed: {
    ...mapState('upvote', ['upvotes']),
    ...mapState(['ideas', 'sortByField']),

    sortedIdeas() {
      return [...this.ideas].sort(sortBy(this.upvotes)[this.sortByField]);
    }
  },

  methods: {
    ...mapActions(['getIdeas'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
