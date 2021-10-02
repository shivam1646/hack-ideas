<template>
  <div
    class="d-flex flex-column"
  >
    <div>
      <v-icon class="pa-3">mdi-tag-multiple</v-icon>
      <v-chip
        v-for="tag in filteredTags"
        :key="tag.key"
        v-text="tag.value"
        color="brand"
        class="ma-1"
        outlined
      />
    </div>
    <div>
      <v-icon class="pa-3">mdi-calendar-clock</v-icon>
      <span>{{createdAt | dateString}}</span>
    </div>
  </div>
</template>

<script>
import { TAGS } from '../../data';

export default {
  name: 'idea-meta',

  props: {
    tags: {
      type: Array,
      default: () => []
    },
    createdAt: {
      type: String,
      default: new Date().toString()
    }
  },

  computed: {
    filteredTags() {
      return TAGS.filter(t => this.tags.includes(t.key));
    }
  },

  filters: {
    dateString(date) {
      return new Date(date).toDateString();
    }
  }
}
</script>
