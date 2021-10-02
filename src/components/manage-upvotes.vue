<template>
  <div
    class="d-flex align-center"
  >
    <!-- Remove upvote button -->
    <v-btn
      text
      v-if="isUpvotedByCurrentUser()"
      @click="remove(ideaId)"
    >
      <span>
        <v-icon class="pa-3">mdi-thumb-up</v-icon>Upvoted
      </span>
    </v-btn>
    <!-- Upvote button -->
    <v-btn
      text
      v-else
      @click="upvote(ideaId)"
    >
      <span>
        <v-icon class="pa-3">mdi-thumb-up-outline</v-icon>Upvote
      </span>
    </v-btn>
    <!-- Upvotes count -->
    <span v-text="'·'" />
    <span class="pa-3" v-text="`${totalUpvotes} people upvoted this`" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'manage-upvotes',

  props: {
    ideaId: {
      type: String,
      required: true
    }
  },

  created() {
    this.getUpvotes()
  },

  computed: {
    ...mapState('upvote', ['upvotes']),
    ...mapState(['loggedInUser']),
    totalUpvotes() {
      return this.upvotes.filter(uv => uv.ideaId === this.ideaId).length
    }
  },

  methods: {
    ...mapActions('upvote', ['upvote', 'remove', 'getUpvotes']),
    isUpvotedByCurrentUser() {
      return this.upvotes.some(uv => {
         return uv.ideaId === this.ideaId
          && uv.userId === this.loggedInUser?.emp_id
      });
    }
  }

}
</script>

<style lang="scss" scoped>
.v-btn .v-icon {
  color: $brand-color;
}
</style>
