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
import IdeaPreview from './idea-preview.vue';
import Toolbar from './toolbar.vue';
import { mapState, mapActions } from 'vuex';
import { getVotesCount } from '../../utils';

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
      if (this.sortByField === 'createdAt') {
        return [...this.ideas].sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
      }
      return [...this.ideas].sort((a, b) => {
        return getVotesCount(b, this.upvotes) - getVotesCount(a, this.upvotes)
      });
    }
  },

  methods: {
    ...mapActions(['getIdeas'])
  }
}
</script>

<style lang="scss" scoped>
.count {
  color: $secondary-text-color;
}
.wrapper {
  width: 100%;
}
</style>
