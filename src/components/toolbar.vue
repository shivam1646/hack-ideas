<template>
  <div
    class="d-flex justify-space-between align-center my-10"
    :class="$vuetify.breakpoint.mdAndUp ? 'flex-row' : 'flex-column'"
  >
    <span
      class="count"
      v-text="`${ideasCount} ideas found.`"
    />
    <div>
    <v-tabs
      v-if="ideasCount"
      color="brand"
      :value="tabIndex"
      @change="onTabChange"
    >
      <v-tab
        v-for="tab in TABS"
        :key="tab.id"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { TABS } from '../../data';

export default {
  name: 'toolbar',

  data: () => ({
    tabIndex: 0
  }),

  created() {
    this.TABS = TABS;
  },

  computed: {
    ...mapGetters(['ideasCount'])
  },

  methods: {
    ...mapMutations(['setSortByField']),

    onTabChange(index) {
      this.setSortByField(this.TABS[index].value);
    }
  }
}
</script>
