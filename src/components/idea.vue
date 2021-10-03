<template>
  <v-row justify="center">
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
      <v-card flat>
        <v-card-title v-text="'Idea'" />
        <v-card-text>
          <form @submit.prevent="onSubmit">
            <v-text-field
              :value="title"
              @input="setField({ field: 'title', value: $event })"
              label="Title"
              color="brand"
              outlined
            />
            <v-textarea
              :value="description"
              @input="setField({ field: 'description', value: $event })"
              label="Description"
              color="brand"
              outlined
            />
            <v-autocomplete
              :value="tags"
              @change="setField({ field: 'tags', value: $event })"
              :items="TAGS"
              item-text="value"
              item-value="key"
              multiple
              hide-selected
              outlined
              color="brand"
              label="Tags"
              chips
            />
            <v-btn
              block
              text
              type="submit"
              v-text="'SUBMIT'"
              :disabled="$v.$invalid"
              color="action"
            />
          </form>
          <v-alert
            v-text="error"
            :value="!!error"
            color="brand"
            text
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { TAGS } from '../../data';

export default {
  name: 'idea',

  mixins: [validationMixin],

  data: () => ({
    error: null
  }),

  created() {
    this.TAGS = TAGS;
  },

  computed: {
    ...mapState('idea', ['title', 'description', 'tags'])
  },

  validations: {
    title: {
      required
    },
    description: {
      required
    },
    tags: {
      required
    }
  },

  methods: {
    ...mapMutations('idea', ['setField']),
    ...mapActions('idea', ['add']),

    onSubmit() {
      try {
        this.add();
        this.$router.push({ name: 'home' });
      } catch (err) {
        this.error = err;
      }
    }
  }
}
</script>
